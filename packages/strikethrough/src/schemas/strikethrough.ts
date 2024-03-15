import { MarkSpec } from 'prosemirror-model';

export const EDIM_STRIKETHROUGH_MARK_NAME = 'strikethrough';

export interface EdybaraStrikethroughMarkConfigs {
  markName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraStrikethroughMarkConfigs> = {
  markName: EDIM_STRIKETHROUGH_MARK_NAME,
};

export const edybaraStrikethroughMarks = (
  configs?: EdybaraStrikethroughMarkConfigs,
): Record<string, MarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 's' }],
    toDOM() {
      return ['s', 0];
    },
  };

  return {
    [mergedConfigs.markName]: markSpec,
  };
};
