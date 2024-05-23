import { MarkSpec } from '@edybara/pm/model';

export const EDYBARA_STRIKETHROUGH_MARK_NAME = 'strikethrough';

export interface EdybaraStrikethroughMarkConfigs {
  markName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraStrikethroughMarkConfigs> = {
  markName: EDYBARA_STRIKETHROUGH_MARK_NAME,
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
