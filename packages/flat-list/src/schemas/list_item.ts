import { NodeSpec } from '@edybara/pm/model';
import {
  AlignableAttrs,
  AlignableNodeSpec,
  IndentableAttrs,
  IndentableNodeSpec,
  LIST_ITEM_GROUP,
  isQuillTaskList,
  parseQuillIndent,
  parseQuillTextAlign,
} from '@edybara/core';

export type EdybaraListItemAttrs = AlignableAttrs & IndentableAttrs;

export type EdybaraListItemNodeSpec = AlignableNodeSpec & IndentableNodeSpec;

export interface EdybaraFlatListItemNodeConfigs {
  maxIndent?: number;
  allowAlign?: boolean;
}

const DEFAULT_CONFIGS: Required<EdybaraFlatListItemNodeConfigs> = {
  maxIndent: 6,
  allowAlign: true,
};

export const edybaraFlatListItemNodes = (
  configs?: EdybaraFlatListItemNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: EdybaraListItemNodeSpec = {
    group: `${LIST_ITEM_GROUP}`,
    content: 'paragraph',
    attrs: {
      indent: {
        default: 1,
      },
      align: {
        default: 'left',
      },
    },
    meta: {
      allowAlign: mergedConfigs.allowAlign,
      maxIndent: mergedConfigs.maxIndent,
    },
    parseDOM: [
      {
        tag: 'li',
        getAttrs(node) {
          const dom = node;
          const align = dom.getAttribute('data-text-align');
          const quillAlign = parseQuillTextAlign(dom);
          const indent = dom.dataset['indent'];
          const quillIndent = parseQuillIndent(dom);

          if (dom.parentElement && isQuillTaskList(dom.parentElement)) {
            return false;
          }

          return {
            align: align || quillAlign || null,
            indent: indent || quillIndent || 1,
          };
        },
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as EdybaraListItemAttrs;
      return [
        'li',
        {
          class: `edybara-list-item edybara-list-item-indent-${attrs.indent || 1} ${
            attrs.align ? ` edybara-align-${attrs.align}` : ''
          }`,
          'data-text-align': attrs.align || 'left',
          'data-indent': attrs.indent || 1,
        },
        0,
      ];
    },
    defining: true,
  };

  return {
    list_item: nodeSpec,
  };
};
