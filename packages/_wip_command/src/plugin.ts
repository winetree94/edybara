import { Plugin, PluginKey, PluginView } from '@edybara/pm/state';
import { EditorView } from '@edybara/pm/view';

export interface EdybaraCommandPluginConfigs {
  view?: (
    view: EditorView,
    plugin: PluginKey<EdybaraCommandPluginState>,
  ) => PluginView;
}

export interface EdybaraCommandPluginView extends PluginView {
  handleKeydown?(view: EditorView, event: KeyboardEvent): boolean | void;
}

export interface EdybaraCommandPluginState {
  active: boolean;
  keyword: string;
}

const DefaultCommandPluginState: EdybaraCommandPluginState = {
  active: false,
  keyword: '',
};

export const edybaraCommandPlugins = (config: EdybaraCommandPluginConfigs) => {
  const commandPluginKey = new PluginKey<EdybaraCommandPluginState>(
    'commandPlugin',
  );
  let pluginView: EdybaraCommandPluginView | null = null;
  return [
    new Plugin<EdybaraCommandPluginState>({
      key: commandPluginKey,
      view: (editorView) => {
        pluginView = config.view?.(editorView, commandPluginKey) || {};
        return pluginView;
      },
      props: {
        handleKeyDown: (view, event) => {
          return pluginView?.handleKeydown?.(view, event) || false;
        },
      },
      state: {
        init: () => {
          return {
            active: false,
            keyword: '',
          };
        },
        apply: (tr, pluginState, state) => {
          if (tr.selection.$from.parent !== tr.selection.$to.parent) {
            return DefaultCommandPluginState;
          }

          if (!tr.selection.$from.parent.isTextblock) {
            return DefaultCommandPluginState;
          }

          const text = tr.selection.$from.parent.textContent;
          if (!text.startsWith('/') || text.includes(' ')) {
            return DefaultCommandPluginState;
          }

          return {
            active: true,
            keyword: text.slice(1),
          };
        },
      },
    }),
  ];
};
