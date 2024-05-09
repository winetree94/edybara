import { history, redo, undo } from '@edybara/pm/history';
import { keymap } from '@edybara/pm/keymap';
import { Plugin } from '@edybara/pm/state';

export const edybaraHistoryPlugins = (): Plugin[] => {
  return [
    history(),
    keymap({
      'Mod-z': undo,
      'Shift-Mod-z': redo,
    }),
  ];
};
