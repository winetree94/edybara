import { Selection, TextSelection } from '@edybara/pm/state';

export const isTextSelection = (
  selection: Selection,
): selection is TextSelection => {
  return selection && typeof selection === 'object' && '$cursor' in selection;
};
