import { MarkSpec } from '@edybara/pm/model';

export const EDYBARA_UNDERLINE_MARK_NAME = 'underline';

export interface EdybaraUnderlineMarkConfigs {
  markName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraUnderlineMarkConfigs> = {
  markName: EDYBARA_UNDERLINE_MARK_NAME,
};

export const edybaraUnderlineMarks = (
  configs?: EdybaraUnderlineMarkConfigs,
): Record<string, MarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 'u' }],
    toDOM() {
      return ['u', 0];
    },
  };

  return {
    [mergedConfigs.markName]: markSpec,
  };
};
