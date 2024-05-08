import { Plugin as PMPlugin } from '@edybara/pm/state';
import { edybaraLinkFloatingLayerPlugins } from './floating-layer';
import { MarkType } from '@edybara/pm/model';

export interface EdybaraLinkPluginConfigs {
  markType: MarkType;
}

export const edybaraLinkPlugins = (configs: EdybaraLinkPluginConfigs): PMPlugin[] => {
  return [...edybaraLinkFloatingLayerPlugins(configs)];
};
