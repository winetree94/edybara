import { NodeSpec } from '@edybara/pm/model';

export interface AlignableAttrs {
  align: TEXT_ALIGNMENTS;
}

export const TEXT_ALIGNMENT = {
  DEFAULT: null,
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export type TEXT_ALIGNMENTS =
  (typeof TEXT_ALIGNMENT)[keyof typeof TEXT_ALIGNMENT];

export interface AlignableNodeSpec extends NodeSpec {
  attrs: {
    align: {
      default: TEXT_ALIGNMENTS;
    };
  };
  meta: {
    allowAlign: boolean;
  };
}
