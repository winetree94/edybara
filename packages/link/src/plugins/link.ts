import { Plugin as PMPlugin } from 'prosemirror-state';
import { edybaraLinkFloatingLayerPlugins } from './floating-layer';
import { MarkType } from 'prosemirror-model';

export interface EdybaraLinkPluginConfigs {
  markType: MarkType;
}

export const edybaraLinkPlugins = (configs: EdybaraLinkPluginConfigs): PMPlugin[] => {
  return [...edybaraLinkFloatingLayerPlugins(configs)];
};
