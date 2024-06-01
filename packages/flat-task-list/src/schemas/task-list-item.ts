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
import { createNode } from '../utils';

export type EdybaraFlatTaskListItemAttrs = {
  checked: boolean;
} & AlignableAttrs &
  IndentableAttrs;

export type EdybaraFlatTaskListItemNodeSpec = {
  attrs: {
    checked: {
      default: boolean;
    };
  };
} & AlignableNodeSpec &
  IndentableNodeSpec;

export interface EdybaraFlatTaskListItemNodeConfigs {
  maxIndent?: number;
  allowAlign?: boolean;
}

const DEFAULT_CONFIGS: Required<EdybaraFlatTaskListItemNodeConfigs> = {
  maxIndent: 6,
  allowAlign: true,
};

export const edybaraFlatTaskListItemNodes = (
  configs?: EdybaraFlatTaskListItemNodeConfigs,
): Record<string, NodeSpec> => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const nodeSpec: EdybaraFlatTaskListItemNodeSpec = {
    content: 'paragraph',
    group: `${LIST_ITEM_GROUP}`,
    attrs: {
      indent: {
        default: 1,
      },
      align: {
        default: 'left',
      },
      checked: {
        default: false,
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
          const dom = node as HTMLLIElement;

          if (dom.classList.contains('edybara-list-item')) {
            return false;
          }

          const align = dom.getAttribute('data-text-align');
          const quillAlign = parseQuillTextAlign(dom);
          const indent = dom.dataset['indent'];
          const quillIndent = parseQuillIndent(dom);
          const checked = dom.dataset['checked'] === 'true';

          if (dom.parentElement && isQuillTaskList(dom.parentElement)) {
            return {
              align: align || quillAlign || null,
              indent: indent || quillIndent || 1,
              checked: dom.parentElement.dataset['checked'] === 'true',
            };
          }

          return {
            align: align || quillAlign || null,
            indent: indent || quillIndent || 1,
            checked: checked,
          };
        },
      },
    ],
    toDOM(node) {
      const li = createNode(node);
      return {
        dom: li,
        contentDOM: li,
      };
    },
    defining: true,
  };

  return {
    task_list_item: nodeSpec,
  };
};
