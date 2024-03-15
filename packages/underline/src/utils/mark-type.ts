import { createEnsuredMarkType } from '@edybara-editor/core';
import { EDIM_UNDERLINE_MARK_NAME } from '../schemas';

export const checkUnderlineMarkType = createEnsuredMarkType(
  EDIM_UNDERLINE_MARK_NAME,
);
