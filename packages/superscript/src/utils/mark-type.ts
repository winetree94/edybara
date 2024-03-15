import { createEnsuredMarkType } from '@edybara-editor/core';
import { EDIM_SUPERSCRIPT_MARK_NAME } from '../schemas';

export const checkSuperscriptMarkType = createEnsuredMarkType(
  EDIM_SUPERSCRIPT_MARK_NAME,
);
