import { Plugin as PMPlugin, PluginKey } from '@edybara/pm/state';
import { Decoration, DecorationSet, EditorView } from '@edybara/pm/view';
import { findCellClosestToPos } from '../utils';
import { EdybaraTableCellButtonWrapper } from '../components';
import { render } from 'preact';
import { html } from '@edybara/ui';

export const tableCellButtonPluginKey = new PluginKey('tableCellButtonPlugin');

export const edybaraTableCellButtonPlugins = (): PMPlugin[] => {
  let view: EditorView;
  const plugin: PMPlugin<DecorationSet> = new PMPlugin<DecorationSet>({
    key: tableCellButtonPluginKey,
    view: (editorView) => {
      view = editorView;
      return {};
    },
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(tr, set) {
        const selection = tr.selection;
        const cell = findCellClosestToPos(selection.$from);
        if (!cell) {
          return DecorationSet.empty;
        }
        const existingDeco = set.find(cell.pos + 1, cell.pos + 2);
        if (existingDeco.length > 0) {
          return set;
        }
        const wrapper = document.createElement('div');
        wrapper.classList.add('edybara-table-cell-buttons-wrapper');
        wrapper.addEventListener('mousedown', (e) => e.stopPropagation());
        const deco = Decoration.widget(cell.pos + 1, wrapper, {
          destroy: () => {
            render(null, wrapper);
          },
        });
        render(
          html`<${EdybaraTableCellButtonWrapper} editorView=${view} />`,
          wrapper,
        );
        return DecorationSet.create(tr.doc, [deco]);
      },
    },
    props: {
      decorations(state) {
        return plugin.getState(state);
      },
    },
  });
  return [plugin];
};
