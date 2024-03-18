import { createEnsuredMarkType } from '@edybara/core';
import { EDIM_SUBSCRIPT_MARK_NAME } from '../schemas';

export const checkSubscriptMarkType = createEnsuredMarkType(
  EDIM_SUBSCRIPT_MARK_NAME,
);
