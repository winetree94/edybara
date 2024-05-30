export interface Alignable {
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
