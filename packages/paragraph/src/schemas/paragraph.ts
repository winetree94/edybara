import { NodeSpec } from 'prosemirror-model';
import { parseQuillTextAlign } from '@edybara/core';

export const EDIM_PARAGRAPH_DEFAULT_NODE_NAME = 'paragraph';

export interface ParagraphAttributes {
  align: 'left' | 'right' | 'center' | null;
}

export interface EdybaraParagraphNodeConfigs {
  /**
   * allow text align
   *
   * @default true
   */
  allowAlign?: boolean;

  /**
   * node name
   *
   * @default "paragraph"
   */
  nodeName?: string;
}

const DEFAULT_CONFIGS: Required<EdybaraParagraphNodeConfigs> = {
  allowAlign: true,
  nodeName: EDIM_PARAGRAPH_DEFAULT_NODE_NAME,
};

export const edybaraParagraphNodes = (
  configs?: EdybaraParagraphNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: NodeSpec = {
    content: 'inline*',
    group: 'block',
    attrs: {},
    parseDOM: [
      {
        tag: 'p',
        getAttrs: (node) => {
          const dom = node as HTMLElement;
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
      const attrs = node.attrs as ParagraphAttributes;
      const classes = ['edybara-paragraph'];
      if (attrs.align) {
        classes.push(`edybara-align-${attrs.align}`);
      }
      return [
        'p',
        {
          class: classes.join(' '),
          'data-text-align': attrs.align || 'left',
        },
        0,
      ];
    },
  };

  if (mergedConfigs.allowAlign) {
    nodeSpec.attrs!['align'] = {
      default: 'left',
    };
  }

  return {
    [mergedConfigs.nodeName]: nodeSpec,
  };
};
