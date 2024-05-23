import { MarkSpec } from '@edybara/pm/model';

export interface EdybaraSuperscriptMarkConfigs {
  subscriptMarkName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraSuperscriptMarkConfigs> = {
  subscriptMarkName: '',
};

export const edybaraSuperscriptMarks = (
  configs?: EdybaraSuperscriptMarkConfigs,
): Record<string, MarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const markSpec: MarkSpec = {
    parseDOM: [{ tag: 'sup' }],
    toDOM() {
      return ['sup', 0];
    },
  };

  if (mergedConfigs.subscriptMarkName) {
    markSpec.excludes = mergedConfigs.subscriptMarkName;
  }

  return {
    superscript: markSpec,
  };
};
