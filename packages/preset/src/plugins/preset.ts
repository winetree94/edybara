import { Plugin as PMPlugin, Plugin } from 'prosemirror-state';
import { edybaraCorePlugins } from '@edybara/core';
import {
  EDIM_HEADING_DEFAULT_NODE_NAME,
  EdybaraHeadingPluginConfigs,
  edybaraHeadingPlugins,
} from '@edybara/heading';
import {
  EDIM_PARAGRAPH_DEFAULT_NODE_NAME,
  EdybaraParagraphPluginConfigs,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import {
  EDIM_FLAT_BULLET_LIST_DEFAULT_NODE_NAME,
  EDIM_FLAT_LIST_ITEM_DEFAULT_NODE_NAME,
  EDIM_FLAT_ORDERED_LIST_DEFAULT_NODE_NAME,
  EdybaraFlatListPluginConfigs,
  edybaraFlatListPlugins,
} from '@edybara/flat-list';
import {
  EDIM_DEFAULT_FLAT_TASK_LIST_ITEM_NODE_NAME,
  EDIM_DEFAULT_FLAT_TASK_LIST_NODE_NAME,
  EdybaraFlatTaskListPluginConfigs,
  edybaraFlatTaskListPlugins,
} from '@edybara/flat-task-list';
import {
  EDIM_HORIZONTAL_RULE_NODE_NAME,
  EdybaraHorizontalRulePluginConfigs,
  edybaraHorizontalRulePlugins,
} from '@edybara/hr';
import {
  EDIM_BOLD_MARK_NAME,
  EdybaraBoldPluginConfigs,
  edybaraBoldPlugins,
} from '@edybara/bold';
import {
  EDIM_CODE_MARK_NAME,
  EdybaraCodePluginConfigs,
  edybaraCodePlugins,
} from '@edybara/code';
import {
  EDIM_ITALIC_MARK_NAME,
  EdybaraItalicPluginConfigs,
  edybaraItalicPlugins,
} from '@edybara/italic';
import {
  EDIM_STRIKETHROUGH_MARK_NAME,
  EdybaraStrikethroughPluginConfigs,
  edybaraStrikethroughPlugins,
} from '@edybara/strikethrough';
import {
  EDIM_SUBSCRIPT_MARK_NAME,
  EdybaraSubscriptPluginConfigs,
  edybaraSubscriptPlugins,
} from '@edybara/subscript';
import {
  EDIM_SUPERSCRIPT_MARK_NAME,
  EdybaraSuperscriptPluginConfigs,
  edybaraSuperscriptPlugins,
} from '@edybara/superscript';
import {
  EDIM_UNDERLINE_MARK_NAME,
  EdybaraUnderlinePluginConfigs,
  edybaraUnderlinePlugins,
} from '@edybara/underline';
import {
  EDIM_BLOCKQUOTE_NODE_NAME,
  EdybaraBlockQuotePluginConfigs,
  edybaraBlockQuotePlugins,
} from '@edybara/blockquote';
import {
  EDIM_CODEBLOCK_NODE_NAME,
  EdybaraCodeBlockPluginConfigs,
  edybaraCodeBlockPlugins,
} from '@edybara/codeblock';
import {
  EDIM_TABLE_CELL_DEFAULT_NODE_NAME,
  EDIM_TABLE_DEFAULT_NODE_NAME,
  EDIM_TABLE_ROW_DEFAULT_NODE_NAME,
  EdybaraTableEditingPluginConfigs,
  edybaraTableEditingPlugins,
  edybaraTablePlugins,
} from '@edybara/tables';
import {
  EdybaraMenubarPluginConfigs,
  edybaraMenubarPlugins,
} from '@edybara/menubar';
import { Schema } from 'prosemirror-model';
import { EDIM_FONT_FAMILY_DEFAULT_MARK_NAME } from '@edybara/font-family';
import {
  EDIM_LINK_DEFAULT_MARK_NAME,
  EdybaraLinkPluginConfigs,
  edybaraLinkPlugins,
} from '@edybara/link';
import {
  EDIM_MENTION_DEFAULT_MARK_NAME,
  EdybaraMentionPluginConfigs,
  edybaraMentionPlugins,
} from '@edybara/mention';
import { EDIM_TEXT_COLOR_DEFAULT_MARK_NAME } from '@edybara/text-color';

/**
 * @see https://edybara.me/docs/packages/menubar
 */
export interface EdybaraPresetPluginConfigs {
  /**
   * preset schema
   * @requires
   */
  schema: Schema;

  paragraph?: EdybaraParagraphPluginConfigs | null;
  heading?: EdybaraHeadingPluginConfigs | null;
  flatTaskList?: EdybaraFlatTaskListPluginConfigs | null;
  flatList?: EdybaraFlatListPluginConfigs | null;
  blockquote?: EdybaraBlockQuotePluginConfigs | null;
  horizontalRule?: EdybaraHorizontalRulePluginConfigs | null;
  codeblock?: EdybaraCodeBlockPluginConfigs | null;
  table?: EdybaraTableEditingPluginConfigs | null;

  italic?: EdybaraItalicPluginConfigs | null;
  bold?: EdybaraBoldPluginConfigs | null;
  code?: EdybaraCodePluginConfigs | null;
  underline?: EdybaraUnderlinePluginConfigs | null;
  strikethrough?: EdybaraStrikethroughPluginConfigs | null;
  subscript?: EdybaraSubscriptPluginConfigs | null;
  superscript?: EdybaraSuperscriptPluginConfigs | null;
  link?: EdybaraLinkPluginConfigs | null;
  mention?: EdybaraMentionPluginConfigs | null;

  /**
   * @default true
   */
  menubar?: EdybaraMenubarPluginConfigs | null;
}

const getDefaultConfigs = (
  schema: Schema,
): Required<Omit<EdybaraPresetPluginConfigs, 'schema'>> => {
  return {
    paragraph: {
      nodeType: schema.nodes[EDIM_PARAGRAPH_DEFAULT_NODE_NAME],
    },
    heading: {
      nodeType: schema.nodes[EDIM_HEADING_DEFAULT_NODE_NAME],
    },
    flatTaskList: {
      taskListNodeType: schema.nodes[EDIM_DEFAULT_FLAT_TASK_LIST_NODE_NAME],
      taskListItemNodeType:
        schema.nodes[EDIM_DEFAULT_FLAT_TASK_LIST_ITEM_NODE_NAME],
    },
    flatList: {
      bulletListNodeType: schema.nodes[EDIM_FLAT_BULLET_LIST_DEFAULT_NODE_NAME],
      orderedListNodeType:
        schema.nodes[EDIM_FLAT_ORDERED_LIST_DEFAULT_NODE_NAME],
      listItemNodeType: schema.nodes[EDIM_FLAT_LIST_ITEM_DEFAULT_NODE_NAME],
    },
    blockquote: {
      nodeType: schema.nodes[EDIM_BLOCKQUOTE_NODE_NAME],
    },
    horizontalRule: {
      nodeType: schema.nodes[EDIM_HORIZONTAL_RULE_NODE_NAME],
    },
    codeblock: {
      nodeType: schema.nodes[EDIM_CODEBLOCK_NODE_NAME],
    },
    table: {
      tableNodeType: schema.nodes[EDIM_TABLE_DEFAULT_NODE_NAME],
      tableRowNodeType: schema.nodes[EDIM_TABLE_ROW_DEFAULT_NODE_NAME],
      tableCellNodeType: schema.nodes[EDIM_TABLE_CELL_DEFAULT_NODE_NAME],
    },
    italic: {
      markType: schema.marks[EDIM_ITALIC_MARK_NAME],
    },
    bold: {
      markType: schema.marks[EDIM_BOLD_MARK_NAME],
    },
    code: {
      markType: schema.marks[EDIM_CODE_MARK_NAME],
    },
    underline: {
      markType: schema.marks[EDIM_UNDERLINE_MARK_NAME],
    },
    strikethrough: {
      markType: schema.marks[EDIM_STRIKETHROUGH_MARK_NAME],
    },
    subscript: {
      markType: schema.marks[EDIM_SUBSCRIPT_MARK_NAME],
    },
    superscript: {
      markType: schema.marks[EDIM_SUPERSCRIPT_MARK_NAME],
    },
    link: {
      markType: schema.marks[EDIM_LINK_DEFAULT_MARK_NAME],
    },
    mention: {
      markType: schema.marks[EDIM_MENTION_DEFAULT_MARK_NAME],
    },
    menubar: {
      textType: {
        paragraphNodeType: schema.nodes[EDIM_PARAGRAPH_DEFAULT_NODE_NAME],
        headingNodeType: schema.nodes[EDIM_HEADING_DEFAULT_NODE_NAME],
      },
      fontFamily: {
        fontFamilyMarkType: schema.marks[EDIM_FONT_FAMILY_DEFAULT_MARK_NAME],
      },
      textStyles: {
        boldMarkType: schema.marks[EDIM_BOLD_MARK_NAME],
        italicMarkType: schema.marks[EDIM_ITALIC_MARK_NAME],
        underlineMarkType: schema.marks[EDIM_UNDERLINE_MARK_NAME],
        strikethroughMarkType: schema.marks[EDIM_STRIKETHROUGH_MARK_NAME],
        codeMarkType: schema.marks[EDIM_CODE_MARK_NAME],
        subscriptMarkType: schema.marks[EDIM_SUBSCRIPT_MARK_NAME],
        superscriptMarkType: schema.marks[EDIM_SUPERSCRIPT_MARK_NAME],
        useClearButton: true,
      },
      textColor: {
        textColorMarkType: schema.marks[EDIM_TEXT_COLOR_DEFAULT_MARK_NAME],
      },
      align: {},
      list: {
        orderedListNodeType:
          schema.nodes[EDIM_FLAT_ORDERED_LIST_DEFAULT_NODE_NAME],
        bulletListNodeType:
          schema.nodes[EDIM_FLAT_BULLET_LIST_DEFAULT_NODE_NAME],
        listItemNodeType: schema.nodes[EDIM_FLAT_LIST_ITEM_DEFAULT_NODE_NAME],
      },
      taskList: {
        taskListNodeType: schema.nodes[EDIM_DEFAULT_FLAT_TASK_LIST_NODE_NAME],
        taskListItemNodeType:
          schema.nodes[EDIM_DEFAULT_FLAT_TASK_LIST_ITEM_NODE_NAME],
      },
      blockquote: {
        blockQuoteNodeType: schema.nodes[EDIM_BLOCKQUOTE_NODE_NAME],
      },
      codeblock: {
        codeBlockNodeType: schema.nodes[EDIM_CODEBLOCK_NODE_NAME],
      },
      table: {
        tableNodeType: schema.nodes[EDIM_TABLE_DEFAULT_NODE_NAME],
      },
      link: {
        linkMarkType: schema.marks[EDIM_LINK_DEFAULT_MARK_NAME],
      },
      mention: {
        mentionMarkType: schema.marks[EDIM_MENTION_DEFAULT_MARK_NAME],
      },
    },
  };
};

export const edybaraPresetPlugins = (
  configs: EdybaraPresetPluginConfigs,
): PMPlugin[] => {
  const plugins: Plugin[] = [];
  const mergedConfigs = {
    ...getDefaultConfigs(configs.schema),
    ...configs,
  };

  if (mergedConfigs.paragraph) {
    plugins.push(...edybaraParagraphPlugins(mergedConfigs.paragraph));
  }

  if (mergedConfigs.heading) {
    plugins.push(...edybaraHeadingPlugins(mergedConfigs.heading));
  }

  if (mergedConfigs.flatTaskList) {
    plugins.push(...edybaraFlatTaskListPlugins(mergedConfigs.flatTaskList));
  }

  if (mergedConfigs.flatList) {
    plugins.push(...edybaraFlatListPlugins(mergedConfigs.flatList));
  }

  if (mergedConfigs.blockquote) {
    plugins.push(...edybaraBlockQuotePlugins(mergedConfigs.blockquote));
  }

  if (mergedConfigs.horizontalRule) {
    plugins.push(...edybaraHorizontalRulePlugins(mergedConfigs.horizontalRule));
  }

  if (mergedConfigs.codeblock) {
    plugins.push(...edybaraCodeBlockPlugins(mergedConfigs.codeblock));
  }

  if (mergedConfigs.table) {
    plugins.push(...edybaraTablePlugins(mergedConfigs.table));
    plugins.push(...edybaraTableEditingPlugins(mergedConfigs.table));
  }

  if (mergedConfigs.italic) {
    plugins.push(...edybaraItalicPlugins(mergedConfigs.italic));
  }

  if (mergedConfigs.bold) {
    plugins.push(...edybaraBoldPlugins(mergedConfigs.bold));
  }

  if (mergedConfigs.code) {
    plugins.push(...edybaraCodePlugins(mergedConfigs.code));
  }

  if (mergedConfigs.underline) {
    plugins.push(...edybaraUnderlinePlugins(mergedConfigs.underline));
  }

  if (mergedConfigs.strikethrough) {
    plugins.push(...edybaraStrikethroughPlugins(mergedConfigs.strikethrough));
  }

  if (mergedConfigs.subscript) {
    plugins.push(...edybaraSubscriptPlugins(mergedConfigs.subscript));
  }

  if (mergedConfigs.superscript) {
    plugins.push(...edybaraSuperscriptPlugins(mergedConfigs.superscript));
  }

  if (mergedConfigs.link) {
    plugins.push(...edybaraLinkPlugins(mergedConfigs.link));
  }

  if (mergedConfigs.mention) {
    plugins.push(...edybaraMentionPlugins(mergedConfigs.mention));
  }

  if (mergedConfigs.menubar) {
    plugins.push(...edybaraMenubarPlugins(mergedConfigs.menubar));
  }

  plugins.push(...edybaraCorePlugins());

  return plugins;
};
