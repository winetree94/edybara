import { parseQuillTextAlign } from '@edybara/core';
import { Attrs, NodeSpec } from '@edybara/pm/model';

export type EdybaraHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type EdybaraHeadingAlign = 'left' | 'right' | 'center' | null;

export const EDYBARA_HEADING_ALLOWED_LEVELS: EdybaraHeadingLevel[] = [
  1, 2, 3, 4, 5, 6,
];

export interface EdybaraHeadingAttrs extends Attrs {
  level: EdybaraHeadingLevel;
  align: EdybaraHeadingAlign;
}

export interface EdybaraHeadingNodeSpec extends NodeSpec {
  attrs: {
    level: {
      default: number;
    };
    align: {
      default: EdybaraHeadingAlign;
    };
  };
  meta: {
    levels: EdybaraHeadingLevel[];
  };
}

export interface EdybaraHeadingNodeConfigs {
  allowAlign?: boolean;
  levels?: EdybaraHeadingLevel[];
}

const EDYBARA_DEFAULT_HEADING_NODE_CONFIGS: Required<EdybaraHeadingNodeConfigs> =
  {
    allowAlign: true,
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
    },
    meta: {
      levels: mergedConfigs.levels,
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

        return {
          level,
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
      return [
        'h' + attrs.level,
        {
          class: classes.join(' '),
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
