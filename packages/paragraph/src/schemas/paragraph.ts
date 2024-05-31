import { NodeSpec } from '@edybara/pm/model';
import {
  AlignableAttrs,
  AlignableNodeSpec,
  IndentableAttrs,
  IndentableNodeSpec,
  parseQuillTextAlign,
} from '@edybara/core';

export type EdybaraParagraphAttrs = AlignableAttrs & IndentableAttrs;

export type EdybaraParagraphNodeSpec = AlignableNodeSpec & IndentableNodeSpec;

export interface EdybaraParagraphNodeConfigs {
  /**
   * allow text align
   *
   * @default true
   */
  allowAlign?: boolean;

  /**
   * max indent
   *
   * @default 8
   */
  maxIndent?: number;
}

const DEFAULT_CONFIGS: Required<EdybaraParagraphNodeConfigs> = {
  allowAlign: true,
  maxIndent: 8,
};

export const edybaraParagraphNodes = (
  configs?: EdybaraParagraphNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: EdybaraParagraphNodeSpec = {
    content: 'inline*',
    group: 'block',
    attrs: {
      align: { default: null },
      indent: { default: 0 },
    },
    meta: {
      maxIndent: mergedConfigs.maxIndent,
      allowAlign: mergedConfigs.allowAlign,
    },
    parseDOM: [
      {
        tag: 'p',
        getAttrs: (node) => {
          const dom = node;
          const align = dom.getAttribute('data-text-align');
          const quillAlign = parseQuillTextAlign(dom);
          const indent = dom.getAttribute('data-indent');
          return {
            align: align || quillAlign || null,
            indent: indent || 0,
          };
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as EdybaraParagraphAttrs;
      const classes = ['edybara-paragraph'];
      if (attrs.align) {
        classes.push(`edybara-align-${attrs.align}`);
      }
      if (attrs.indent !== 0) {
        classes.push(`edybara-indent-${attrs.indent}`);
      }
      return [
        'p',
        {
          class: classes.join(' '),
          'data-indent': attrs.indent || 0,
          'data-text-align': attrs.align || 'left',
        },
        0,
      ];
    },
  };

  if (mergedConfigs.allowAlign) {
    nodeSpec.attrs['align'] = {
      default: 'left',
    };
  }

  return {
    paragraph: nodeSpec,
  };
};
