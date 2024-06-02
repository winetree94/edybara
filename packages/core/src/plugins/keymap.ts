import { keymap } from '@edybara/pm/keymap';
import {
  baseKeymap,
  chainCommands,
  createParagraphNear,
  liftEmptyBlock,
  newlineInCode,
  splitBlockAs,
} from '@edybara/pm/commands';
import { Plugin, TextSelection } from '@edybara/pm/state';
import {
  clearMarks,
  indent,
  insertIndent,
  listItemBackspace,
} from '../commands';

export const edybaraBasicKeymapPlugins = (): Plugin[] => {
  const cmd = {
    indent: indent({
      reduce: 1,
    }),
    unindent: indent({
      reduce: -1,
    }),
    backspace: listItemBackspace(),
  };
  return [
    keymap({
      Tab: (state, dispatch) => {
        const selection = state.selection;
        if (
          selection.empty &&
          selection instanceof TextSelection &&
          selection.$cursor &&
          selection.$cursor.parentOffset !== 0
        ) {
          return false;
        }
        return cmd.indent(state, dispatch);
      },
      'Shift-Tab': (state, dispatch) => {
        const selection = state.selection;
        if (
          selection.empty &&
          selection instanceof TextSelection &&
          selection.$cursor &&
          selection.$cursor.parentOffset !== 0
        ) {
          return false;
        }
        return cmd.unindent(state, dispatch);
      },
      Backspace: (state, dispatch) => {
        const selection = state.selection;
        if (
          selection.empty &&
          selection instanceof TextSelection &&
          selection.$cursor &&
          selection.$cursor.parentOffset === 0 &&
          selection.$cursor.parent.type.spec.attrs?.['indent'] &&
          selection.$cursor.parent.attrs['indent'] > 0
        ) {
          const tr = state.tr.setNodeMarkup(selection.from - 1, null, {
            ...selection.$cursor.parent.attrs,
            indent: selection.$cursor.parent.attrs['indent'] - 1,
          });
          dispatch?.(tr);
          return true;
        }
        return cmd.backspace(state, dispatch);
      },
    }),
    keymap({
      Tab: insertIndent(),
      // 'Shift-Tab': deleteIndent(),
    }),
    keymap({
      /**
       * Switch to the default node of the Schema when the first node is empty.
       */
      Backspace: (state, dispatch) => {
        const selection = state.selection;

        if (!selection.empty || selection.from !== selection.to) {
          return false;
        }

        const firstNodeOfDoc = state.doc.firstChild;

        if (!firstNodeOfDoc) {
          return false;
        }

        if (firstNodeOfDoc !== selection.$from.parent) {
          return false;
        }

        const firstNode = selection.$from.parent;
        if (firstNode.content.size !== 0) {
          return false;
        }

        let tr = state.tr.setStoredMarks([]);

        const paragraph = state.schema.nodes['paragraph'];

        if (paragraph === firstNode.type) {
          dispatch?.(tr);
          return true;
        }

        const newNode = paragraph.createAndFill();

        if (!newNode) {
          dispatch?.(tr);
          return true;
        }

        tr = tr.setNodeMarkup(0, paragraph);
        dispatch?.(tr);
        return true;
      },
      'Mod-\\': clearMarks(),

      Enter: (state, dispatch) => {
        const result = chainCommands(
          newlineInCode,
          createParagraphNear,
          liftEmptyBlock,
          splitBlockAs((node) => {
            const attrs = {
              ...node.attrs,
            };
            if (attrs['indent']) {
              attrs['indent'] = 0;
            }
            if (node.type.name === 'heading') {
              return state.schema.nodes['paragraph'].create(attrs);
            }
            return node.type.create(attrs);
          }),
        )(state, dispatch);
        return result;
      },

      /**
       * Prevents focus from leaving when the Tab key is pressed.
       */
      'Shift-Tab': () => true,
      Tab: () => true,
    }),
    keymap(baseKeymap),
  ];
};
