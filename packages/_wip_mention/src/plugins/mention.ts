import { MarkType } from 'prosemirror-model';
import { Plugin as PMPlugin } from 'prosemirror-state';
import {
  EdybaraMentionCommandPluginConfigs,
  edybaraMentionCommandPlugins,
} from './command';
import { edybaraMentionUnsetPlugins } from './unset';
import { EdybaraMentionView } from '../views';

export interface EdybaraMentionPluginConfigs {
  markType: MarkType;
  commandView?: EdybaraMentionCommandPluginConfigs['view'];
}

const DEFAULT_CONFIGS: Required<Omit<EdybaraMentionPluginConfigs, 'markType'>> = {
  commandView: (view, plugin) => {
    return new EdybaraMentionView(view, plugin, (keyword) => [
      {
        icon: '',
        id: '1',
        name: 'Mention Command View Not Provided',
      },
    ]);
  },
};

export const edybaraMentionPlugins = (
  configs: EdybaraMentionPluginConfigs,
): PMPlugin[] => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  return [
    ...edybaraMentionCommandPlugins({
      view: mergedConfigs.commandView,
    }),
    ...edybaraMentionUnsetPlugins(),
  ];
};
