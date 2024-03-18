import { createEnsuredMarkType } from '@edybara/core';
import { EDIM_UNDERLINE_MARK_NAME } from '../schemas';

export const checkUnderlineMarkType = createEnsuredMarkType(
  EDIM_UNDERLINE_MARK_NAME,
);
