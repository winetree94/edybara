import { MarkSpec } from '@edybara/pm/model';

export interface EdybaraSubscriptMarkConfigs {
  superscriptMarkName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraSubscriptMarkConfigs> = {
  superscriptMarkName: '',
};

export const edybaraSubscriptMarks = (
  configs?: EdybaraSubscriptMarkConfigs,
): Record<string, MarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 'sub' }],
    toDOM() {
      return ['sub', 0];
    },
  };

  if (mergedConfigs.superscriptMarkName) {
    markSpec.excludes = mergedConfigs.superscriptMarkName;
  }

  return {
    subscript: markSpec,
  };
};
