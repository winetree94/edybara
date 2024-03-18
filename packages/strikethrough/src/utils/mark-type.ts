import { createEnsuredMarkType } from '@edybara/core';
import { EDIM_STRIKETHROUGH_MARK_NAME } from '../schemas';

export const checkStrikethroughMarkType = createEnsuredMarkType(
  EDIM_STRIKETHROUGH_MARK_NAME,
);
