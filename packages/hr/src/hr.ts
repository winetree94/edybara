import { keymap } from 'prosemirror-keymap';
import { DOMOutputSpec, NodeSpec, NodeType } from '@edybara/pm/model';

const hrDOM: DOMOutputSpec = ['hr'];
export const edybaraHorizontalRuleNodes = (): Record<string, NodeSpec> => ({
  horizontal_rule: {
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM() {
      return hrDOM;
    },
  },
});

export interface EdybaraHorizontalRulePluginConfigs {
  nodeType: NodeType;
}

export const edybaraHorizontalRulePlugins = (
  configs: EdybaraHorizontalRulePluginConfigs,
) => {
  return [
    keymap({
      'Mod-_': (state, dispatch) => {
        if (dispatch) {
          dispatch(
            state.tr
              .replaceSelectionWith(configs.nodeType.create())
              .scrollIntoView(),
          );
        }
        return true;
      },
    }),
  ];
};
