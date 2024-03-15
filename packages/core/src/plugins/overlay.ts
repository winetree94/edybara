import { Plugin as PMPlugin, PluginKey } from 'prosemirror-state';

export interface EdybaraOverlayPluginState {
  overlayElement: HTMLDivElement;
}

export interface EdybaraOverlayPluginConfigs {
  key?: PluginKey<EdybaraOverlayPluginState>;
}

const DEFAULT_CONFIGS: Required<EdybaraOverlayPluginConfigs> = {
  key: new PluginKey('EdybaraOverlayPluginKey'),
};

export const edybaraOverlayPlugins = (
  configs?: EdybaraOverlayPluginConfigs,
): PMPlugin[] => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const overlay = document.createElement('div');
  overlay.classList.add('edybara-overlay-container');

  const plugin: PMPlugin<EdybaraOverlayPluginState> =
    new PMPlugin<EdybaraOverlayPluginState>({
      key: mergedConfigs.key,
      view: (view) => {
        view.dom.parentElement?.appendChild(overlay);
        return {};
      },
      state: {
        init: () => {
          return {
            overlayElement: overlay,
          };
        },
        apply: (tr, prev) => {
          return prev;
        },
      },
    });
  return [plugin];
};
