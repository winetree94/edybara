import {
  EdybaraLayer,
  EdybaraListItem,
  EdybaraUnorderedList,
  EdybaraParagraph,
  classes,
  html,
} from '@edybara/ui';
import { EditorState, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { render } from 'preact';
import { getMentionRange } from '../utils';
import { useEffect } from 'preact/hooks';
import { forwardRef } from 'preact/compat';
import { MentionPluginState, MentionPluginView } from '../plugins';

export interface MentionItem {
  icon: string;
  id: string;
  name: string;
}

export interface EdybaraMentionViewProps {
  items: MentionItem[];
  selectedIndex: number;
  onHover?(index: number): void;
  onClick?(index: number): void;
}

export const EdybaraMention = forwardRef((props: EdybaraMentionViewProps) => {
  useEffect(() => {
    const selected = document.querySelector(
      '.edybara-view-mention-list-item.selected',
    );
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }, [props.selectedIndex]);

  return html`
    <div className="edybara-view-mention-container">
      <${EdybaraUnorderedList}>
        ${props.items.map(
          (item, index) => html`
            <${EdybaraListItem}
              key=${index}
              className=${classes(
                'edybara-view-mention-list-item',
                props.selectedIndex === index ? 'selected' : '',
              )}
              onMouseMove=${() => props.onHover?.(index)}
              onClick=${() => props.onClick?.(index)}
            >
              <img
                class="edybara-view-mention-list-item-avatar"
                src=${item.icon}
              />
              <div className="edybara-view-mention-list-item-content">
                <${EdybaraParagraph} className="edybara-view-mention-item-name">
                  ${item.name}
                </${EdybaraParagraph}>
              </div>
            </${EdybaraListItem}>
          `,
        )}
      </${EdybaraUnorderedList}>
    </div>
  `;
});

export class EdybaraMentionView implements MentionPluginView {
  public prevKeyword: string = '';
  public wrapper: HTMLDivElement | undefined;
  public index = 0;

  public constructor(
    private readonly view: EditorView,
    private readonly pluginKey: PluginKey<MentionPluginState>,
    private readonly items: (keyword: string) => MentionItem[],
  ) {}

  public update(view: EditorView) {
    const pstate = this.pluginKey.getState(view.state);
    if (pstate?.active) {
      this.render(view, view.state, pstate);
    } else {
      this.unmount();
    }
    return;
  }

  public render(
    view: EditorView,
    editorState: EditorState,
    pluginState: MentionPluginState,
  ): void {
    const items = this.items(pluginState.keyword);

    if (items.length === 0) {
      this.unmount();
      return;
    }

    const start = view.coordsAtPos(pluginState.start);

    if (!this.wrapper) {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('edybara-view-mention-wrapper');
      this.wrapper.style.top = `${start.bottom}px`;
      this.wrapper.style.left = `${start.left}px`;
      this.view.dom.parentElement?.appendChild(this.wrapper);
    }

    if (this.prevKeyword !== pluginState.keyword) {
      this.index = 0;
    }

    render(
      html`
        <${EdybaraLayer}
          target=${this.wrapper}
          disableBackdrop=${true}
          maxWidth=${200}
          minWidth=${200}
          maxHeight=${300}
        >
          <${EdybaraMention}
            items=${items}
            selectedIndex=${this.index}
            onHover=${(index: number) => {
              this.index = index;
              this.update(view);
            }}
            onClick=${(index: number) => {
              this.index = index;
              this.update(view);
              this.applyMention(items[index]);
            }}
          />
        </${EdybaraLayer}>
      `,
      this.wrapper,
    );

    this.prevKeyword = pluginState.keyword;
  }

  public applyMention(item: MentionItem) {
    if (!item.id) {
      return;
    }

    const range = getMentionRange(this.view.state);

    if (!range) {
      return;
    }

    this.view.dispatch(
      this.view.state.tr
        .replaceWith(
          range.rangeStart,
          range.rangeEnd,
          this.view.state.schema.text(`@${item.name}`),
        )
        .addMark(
          range.rangeStart,
          range.rangeStart + item.name.length + 1,
          this.view.state.schema.marks['mention'].create({
            data_id: item.id,
          }),
        ),
    );
  }

  public handleKeydown(view: EditorView, event: KeyboardEvent): boolean {
    const pluginState = this.pluginKey.getState(view.state);
    if (!pluginState || !pluginState.active) {
      return false;
    }
    const items = this.items(pluginState.keyword);
    if (event.key === 'ArrowUp') {
      this.index = Math.max(0, this.index - 1);
      this.update(view);
      return true;
    }
    if (event.key === 'ArrowDown') {
      this.index = Math.min(items.length - 1, this.index + 1);
      this.update(view);
      return true;
    }
    if (event.key === 'Enter') {
      this.applyMention(items[this.index]);
      return true;
    }
    if (event.key === 'Escape') {
      this.unmount();
      return true;
    }
    return false;
  }

  public unmount(): void {
    if (this.wrapper) {
      render(null, this.wrapper);
      this.wrapper.remove();
      this.wrapper = undefined;
      this.index = 0;
    }
  }

  public destroy() {
    this.unmount();
  }
}
