import { createEnsuredMarkType } from '@edybara/core';
import { EDIM_SUPERSCRIPT_MARK_NAME } from '../schemas';

export const checkSuperscriptMarkType = createEnsuredMarkType(
  EDIM_SUPERSCRIPT_MARK_NAME,
);
