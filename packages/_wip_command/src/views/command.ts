/* eslint-disable @typescript-eslint/unbound-method */
import { render } from 'preact';
import { EditorState, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EdybaraCommandPluginState, EdybaraCommandPluginView } from '../plugin';
import { addMention } from '@edybara-editor/mention';
import { insertTable } from '@edybara-editor/tables';
import {
  EdybaraLayer,
  EdybaraListItem,
  EdybaraUnorderedList,
  EdybaraParagraph,
  classes,
  html,
} from '@edybara-editor/ui';
import { forwardRef } from 'preact/compat';

export interface EdybaraCommandItem {
  icon: string;
  title: string;
  description: string;
  action: (view: EditorView, standalone?: boolean) => void;
}

export const EDIM_DEFAULT_COMMAND_LIST: EdybaraCommandItem[] = [
  {
    icon: 'ri-at-line',
    title: 'Mention',
    description: 'insert mention',
    action: (view, standalone) => {
      const { from } = view.state.tr.selection;
      let tr = view.state.tr;
      if (!standalone) {
        tr = tr.delete(from - 1, from);
      }
      view.dispatch(tr);
      addMention()(view.state, view.dispatch);
    },
  },
  {
    icon: 'ri-grid-line',
    title: 'Table',
    description: 'insert table',
    action: (view, standalone) => {
      const { from } = view.state.tr.selection;
      let tr = view.state.tr;
      if (!standalone) {
        tr = tr.delete(from - 1, from);
      }
      view.dispatch(tr);
      insertTable()(view.state, view.dispatch);
    },
  },
];

export interface EdybaraCommandProps {
  items: EdybaraCommandItem[];
  selectedIndex: number;
  onHover?(index: number): void;
  onClick?(index: number): void;
}

export const EdybaraCommand = forwardRef((props: EdybaraCommandProps) => {
  return html`
    <div class="edybara-view-command-container">
      <${EdybaraUnorderedList}>
        ${props.items.map(
          (item, index) => html`
            <${EdybaraListItem}
              key=${index}
              className=${classes(
                'edybara-view-command-list-item',
                props.selectedIndex === index ? 'selected' : '',
              )}
              onMouseMove=${() => props.onHover?.(index)}
              onClick=${() => props.onClick?.(index)}
            >
              <i
                className=${classes(
                  item.icon,
                  'edybara-view-command-list-item-icon',
                )}
              />
              <div className="edybara-view-command-item-content">
                <${EdybaraParagraph}>${item.title}</${EdybaraParagraph}>
                <${EdybaraParagraph}>${item.description}</${EdybaraParagraph}>
              </div>
            </${EdybaraListItem}>
          `,
        )}
      </${EdybaraUnorderedList}>
    </div>
  `;
});

export class EdybaraCommandView implements EdybaraCommandPluginView {
  public wrapper: HTMLDivElement | undefined;
  public index = 0;

  public constructor(
    private readonly view: EditorView,
    private readonly pluginKey: PluginKey<EdybaraCommandPluginState>,
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
    pluginState: EdybaraCommandPluginState,
  ): void {
    const commands = EDIM_DEFAULT_COMMAND_LIST.filter((item) => {
      if (!pluginState.keyword) {
        return true;
      }
      return (
        item.title.toLowerCase().includes(pluginState.keyword.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(pluginState.keyword.toLowerCase())
      );
    });

    if (commands.length === 0) {
      this.unmount();
      return;
    }

    const { from } = editorState.selection;
    const start = view.coordsAtPos(from);

    if (!this.wrapper) {
      this.wrapper = document.createElement('div');
      this.wrapper.style.position = 'fixed';
      this.wrapper.style.top = `${start.bottom}px`;
      this.wrapper.style.left = `${start.left}px`;
      this.view.dom.parentElement?.appendChild(this.wrapper);
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
          <${EdybaraCommand}
            items=${commands}
            selectedIndex=${this.index}
            onHover=${(index: number) => {
              this.index = index;
              this.update(view);
            }}
            onClick=${(index: number) => {
              this.index = index;
              this.update(view);
              commands[index].action(view);
            }}
          />
        </${EdybaraLayer}>
      `,
      this.wrapper,
    );
  }

  public handleKeydown(view: EditorView, event: KeyboardEvent): boolean {
    const pluginState = this.pluginKey.getState(view.state);

    if (!pluginState || !pluginState.active) {
      return false;
    }

    const commands = EDIM_DEFAULT_COMMAND_LIST.filter((item) => {
      if (!pluginState.keyword) {
        return true;
      }
      return (
        item.title.toLowerCase().includes(pluginState.keyword.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(pluginState.keyword.toLowerCase())
      );
    });

    if (event.key === 'ArrowUp') {
      this.index = Math.max(0, this.index - 1);
      this.update(view);
      return true;
    }
    if (event.key === 'ArrowDown') {
      this.index = Math.min(commands.length - 1, this.index + 1);
      this.update(view);
      return true;
    }
    if (event.key === 'Enter') {
      commands[this.index]?.action(view, false);
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
