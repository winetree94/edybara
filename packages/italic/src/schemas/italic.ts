import { MarkSpec } from '@edybara/pm/model';

export const EDYBARA_ITALIC_MARK_NAME = 'em';

export interface EdybaraItalicMarkConfigs {
  markName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraItalicMarkConfigs> = {
  markName: EDYBARA_ITALIC_MARK_NAME,
};

export const edybaraItalicMarks = (
  configs?: EdybaraItalicMarkConfigs,
): Record<string, MarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const markSpec: MarkSpec = {
    parseDOM: [
      { tag: 'i' },
      { tag: 'em' },
      { style: 'font-style=italic' },
      { style: 'font-style=normal', clearMark: (m) => m.type.name == 'em' },
    ],
    toDOM() {
      return ['em', 0];
    },
  };

  return {
    [mergedConfigs.markName]: markSpec,
  };
};
