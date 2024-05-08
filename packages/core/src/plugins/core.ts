import { Plugin as PMPlugin } from '@edybara/pm/state';
import { edybaraBasicKeymapPlugins } from './keymap';
import { edybaraHistoryPlugins } from './history';
import { edybaraVirtualCursorPlugins } from './virtual-cursor';
import { edybaraDropCursorPlugins } from './drop-cursor';
import { edybaraGapCursorPlugins } from './gap-cursor';
import { edybaraResetMarkPlugins } from './reset-mark';
import { edybaraOverlayPlugins } from './overlay';
import { edybaraSelectionElementPlugins } from './selection-element';

export const edybaraCorePlugins = (): PMPlugin[] => {
  return [
    ...edybaraOverlayPlugins(),
    ...edybaraBasicKeymapPlugins(),
    ...edybaraHistoryPlugins(),
    ...edybaraVirtualCursorPlugins(),
    ...edybaraResetMarkPlugins(),
    ...edybaraDropCursorPlugins(),
    ...edybaraSelectionElementPlugins(),
    ...edybaraGapCursorPlugins(),
  ];
};
