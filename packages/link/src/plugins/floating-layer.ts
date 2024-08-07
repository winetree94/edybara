import { Plugin as PMPlugin, PluginKey, PluginView } from '@edybara/pm/state';
import { findMark, isTextSelection } from '@edybara/core';
import { MarkType, Node as PMNode } from '@edybara/pm/model';
import { Decoration, DecorationSet, EditorView } from '@edybara/pm/view';
import { render } from 'preact';
import { html } from '@edybara/ui';
import { EdybaraLinkFloatingLayer } from '../components';

export interface EdybaraLinkFloatingLayerPluginState {
  active: {
    pos: number;
    node: PMNode;
    decorationSet?: DecorationSet;
  } | null;
}

const DEFAULT_STATE: Readonly<EdybaraLinkFloatingLayerPluginState> = {
  active: null,
};

export const EDYBARA_LINK_FLOATING_LAYER_PLUGIN_KEY =
  new PluginKey<EdybaraLinkFloatingLayerPluginState>(
    'edybara_link_floating_layer',
  );

export interface edybaraLinkFloatingLayerPluginConfigs {
  markType: MarkType;
  view?: (view: EditorView) => PluginView;
}

const DEFAULT_CONFIGS: Required<
  Omit<edybaraLinkFloatingLayerPluginConfigs, 'markType'>
> = {
  view() {
    return {
      destroy: () => {},
    };
  },
};

export const edybaraLinkFloatingLayerPlugins = (
  configs: edybaraLinkFloatingLayerPluginConfigs,
): PMPlugin[] => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const decorationDomWrapper = document.createElement('div');
  decorationDomWrapper.style.position = 'absolute';
  decorationDomWrapper.style.pointerEvents = 'none';
  let editorView: EditorView | null = null;

  const plugin: PMPlugin<EdybaraLinkFloatingLayerPluginState> =
    new PMPlugin<EdybaraLinkFloatingLayerPluginState>({
      key: EDYBARA_LINK_FLOATING_LAYER_PLUGIN_KEY,
      view: (view) => {
        editorView = view;
        return {};
      },
      state: {
        init: () => ({
          active: null,
        }),
        apply: (tr, value, oldState, newState) => {
          if (!isTextSelection(newState.selection)) {
            return DEFAULT_STATE;
          }

          const link = findMark(mergedConfigs.markType, {
            includeAdjacent: true,
          })(newState);

          if (!link) {
            return DEFAULT_STATE;
          }

          let decorationSet = value?.active?.decorationSet;
          if (!decorationSet) {
            const widget = Decoration.widget(0, decorationDomWrapper, {
              destroy: () => {
                render(null, decorationDomWrapper);
              },
            });
            decorationSet = DecorationSet.create(newState.doc, [widget]);
          }

          const viewPos = editorView!.dom.getBoundingClientRect();
          const startPos = editorView!.coordsAtPos(link.pos);
          const endPos = editorView!.coordsAtPos(link.pos + link.node.nodeSize);
          decorationDomWrapper.style.top = `${startPos.top - viewPos.top}px`;
          decorationDomWrapper.style.left = `${startPos.left - viewPos.left}px`;
          decorationDomWrapper.style.width = `${endPos.left - startPos.left}px`;
          decorationDomWrapper.style.height = `${
            endPos.bottom - startPos.top
          }px`;

          render(
            html`
              <${EdybaraLinkFloatingLayer}
                target=${decorationDomWrapper}
                href="${link.mark.attrs['href']}"
              />
            `,
            decorationDomWrapper,
          );

          return {
            active: {
              pos: link.pos,
              node: link.node,
              decorationSet: decorationSet,
            },
          };
        },
      },
      props: {
        decorations: (state) => {
          const set =
            plugin.getState(state)?.active?.decorationSet ||
            DecorationSet.empty;
          return set;
        },
      },
    });
  return [plugin];
};
