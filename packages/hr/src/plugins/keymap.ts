import { keymap } from '@edybara/pm/keymap';
import { NodeType } from '@edybara/pm/model';

export interface EdybaraHorizontalKeymapPluginConfigs {
  nodeType: NodeType;
}

export const edybaraHorizontalKeymapPlugins = (
  configs: EdybaraHorizontalKeymapPluginConfigs,
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
