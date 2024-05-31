import {
  AlignableAttrs,
  AlignableNodeSpec,
  IndentableAttrs,
  IndentableNodeSpec,
  parseQuillTextAlign,
} from '@edybara/core';

export type EdybaraHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const EDYBARA_HEADING_ALLOWED_LEVELS: EdybaraHeadingLevel[] = [
  1, 2, 3, 4, 5, 6,
];

export type EdybaraHeadingAttrs = {
  level: EdybaraHeadingLevel;
} & AlignableAttrs &
  IndentableAttrs;

export type EdybaraHeadingNodeSpec = {
  attrs: {
    level: {
      default: number;
    };
  };
  meta: {
    levels: EdybaraHeadingLevel[];
  };
} & AlignableNodeSpec &
  IndentableNodeSpec;

export interface EdybaraHeadingNodeConfigs {
  allowAlign?: boolean;
  /**
   * max indent
   *
   * @default 8
   */
  maxIndent?: number;
  levels?: EdybaraHeadingLevel[];
}

const EDYBARA_DEFAULT_HEADING_NODE_CONFIGS: Required<EdybaraHeadingNodeConfigs> =
  {
    allowAlign: true,
    maxIndent: 8,
    levels: EDYBARA_HEADING_ALLOWED_LEVELS.slice(),
  };

export const edybaraHeadingNodes = (
  configs?: EdybaraHeadingNodeConfigs,
): Record<string, EdybaraHeadingNodeSpec> => {
  const mergedConfigs = {
    ...EDYBARA_DEFAULT_HEADING_NODE_CONFIGS,
    ...configs,
  };

  if (
    !mergedConfigs.levels.every((level) =>
      EDYBARA_HEADING_ALLOWED_LEVELS.includes(level),
    )
  ) {
    throw new Error('Invalid heading levels');
  }

  const nodeSpec: EdybaraHeadingNodeSpec = {
    attrs: {
      level: {
        default: mergedConfigs.levels[0],
      },
      align: {
        default: 'left',
      },
      indent: {
        default: 0,
      },
    },
    meta: {
      levels: mergedConfigs.levels,
      maxIndent: mergedConfigs.maxIndent,
      allowAlign: mergedConfigs.allowAlign,
    },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: mergedConfigs.levels.map((level) => ({
      tag: `h${level}`,
      getAttrs: (node) => {
        const dom = node;
        const align = dom.getAttribute('data-text-align');
        const quillAlign = parseQuillTextAlign(dom);
        const indent = dom.getAttribute('data-indent');

        return {
          level,
          indent: indent ? parseInt(indent, 10) : 0,
          align: align || quillAlign || null,
        };
      },
    })),
    toDOM(node) {
      const attrs = node.attrs as EdybaraHeadingAttrs;
      const classes = ['edybara-heading'];
      if (attrs.align) {
        classes.push(`edybara-align-${attrs.align}`);
      }
      if (attrs.indent !== 0) {
        classes.push(`edybara-indent-${attrs.indent}`);
      }
      return [
        'h' + attrs.level,
        {
          class: classes.join(' '),
          'data-indent': attrs.indent || 0,
          'data-text-align': attrs.align || 'left',
        },
        0,
      ];
    },
  };

  return {
    heading: nodeSpec,
  };
};
