import { MarkSpec, MarkType } from 'prosemirror-model';

export const EDIM_FONT_FAMILY_DEFAULT_MARK_NAME = 'font_family';

export interface EdybaraFontFamilyAttrs {
  fontFamily: string | null;
}

export interface EdybaraFontFamily {
  fontFamily: string;
}

export interface EdybaraFontFamilyMarkSpec extends MarkSpec {
  fonts: EdybaraFontFamily[];
}

export interface EdybaraFontFamilyMarkType extends MarkType {
  spec: EdybaraFontFamilyMarkSpec;
}

export interface EdybaraFontFamilyMarkConfigs {
  markName?: string;
  fonts?: EdybaraFontFamily[];
}

const DEFAULT_CONFIGS: Required<EdybaraFontFamilyMarkConfigs> = {
  markName: EDIM_FONT_FAMILY_DEFAULT_MARK_NAME,
  fonts: [
    {
      fontFamily: 'Arial',
    },
    {
      fontFamily: 'Verdana',
    },
    {
      fontFamily: 'Tahoma',
    },
    {
      fontFamily: 'Trebuchet MS',
    },
    {
      fontFamily: 'Times New Roman',
    },
    {
      fontFamily: 'Georgia',
    },
  ],
};

export const edybaraFontFamilyMarks = (
  configs?: EdybaraFontFamilyMarkConfigs,
): Record<string, EdybaraFontFamilyMarkSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const fontByNames = mergedConfigs.fonts.reduce<{
    [key: string]: EdybaraFontFamily;
  }>((acc, font) => {
    acc[font.fontFamily] = font;
    return acc;
  }, {});

  const markSpec: EdybaraFontFamilyMarkSpec = {
    fonts: mergedConfigs.fonts,
    attrs: {
      fontFamily: {
        default: null,
      },
    },
    parseDOM: [
      {
        tag: 'span.edybara-font-family',
        getAttrs: (node) => {
          const dom = node as HTMLElement;
          const fontFamily = dom.dataset['fontFamily'] || '';

          if (!fontFamily) {
            return false;
          }

          if (mergedConfigs.fonts && !fontByNames[fontFamily]) {
            return false;
          }
          return {
            fontFamily: fontFamily || null,
          };
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as EdybaraFontFamilyAttrs;
      return [
        'span',
        {
          class: 'edybara-font-family',
          style: attrs.fontFamily
            ? `font-family: ${attrs.fontFamily}`
            : undefined,
          'data-font-family': attrs.fontFamily || null,
        },
        0,
      ];
    },
  };

  return {
    [mergedConfigs.markName]: markSpec,
  };
};
