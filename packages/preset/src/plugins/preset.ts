import { Plugin as PMPlugin, Plugin } from '@edybara/pm/state';
import { edybaraCorePlugins } from '@edybara/core';
import {
  EDYBARA_HEADING_DEFAULT_NODE_NAME,
  EdybaraHeadingPluginConfigs,
  edybaraHeadingPlugins,
} from '@edybara/heading';
import {
  EDYBARA_PARAGRAPH_DEFAULT_NODE_NAME,
  EdybaraParagraphPluginConfigs,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import {
  EDYBARA_FLAT_BULLET_LIST_DEFAULT_NODE_NAME,
  EDYBARA_FLAT_LIST_ITEM_DEFAULT_NODE_NAME,
  EDYBARA_FLAT_ORDERED_LIST_DEFAULT_NODE_NAME,
  EdybaraFlatListPluginConfigs,
  edybaraFlatListPlugins,
} from '@edybara/flat-list';
import {
  EDYBARA_DEFAULT_FLAT_TASK_LIST_ITEM_NODE_NAME,
  EDYBARA_DEFAULT_FLAT_TASK_LIST_NODE_NAME,
  EdybaraFlatTaskListPluginConfigs,
  edybaraFlatTaskListPlugins,
} from '@edybara/flat-task-list';
import {
  EDYBARA_HORIZONTAL_RULE_NODE_NAME,
  EdybaraHorizontalRulePluginConfigs,
  edybaraHorizontalRulePlugins,
} from '@edybara/hr';
import {
  EDYBARA_BOLD_MARK_NAME,
  EdybaraBoldPluginConfigs,
  edybaraBoldPlugins,
} from '@edybara/bold';
import {
  EDYBARA_CODE_MARK_NAME,
  EdybaraCodePluginConfigs,
  edybaraCodePlugins,
} from '@edybara/code';
import {
  EDYBARA_ITALIC_MARK_NAME,
  EdybaraItalicPluginConfigs,
  edybaraItalicPlugins,
} from '@edybara/italic';
import {
  EDYBARA_STRIKETHROUGH_MARK_NAME,
  EdybaraStrikethroughPluginConfigs,
  edybaraStrikethroughPlugins,
} from '@edybara/strikethrough';
import {
  EDYBARA_SUBSCRIPT_MARK_NAME,
  EdybaraSubscriptPluginConfigs,
  edybaraSubscriptPlugins,
} from '@edybara/subscript';
import {
  EDYBARA_SUPERSCRIPT_MARK_NAME,
  EdybaraSuperscriptPluginConfigs,
  edybaraSuperscriptPlugins,
} from '@edybara/superscript';
import {
  EDYBARA_UNDERLINE_MARK_NAME,
  EdybaraUnderlinePluginConfigs,
  edybaraUnderlinePlugins,
} from '@edybara/underline';
import {
  EDYBARA_BLOCKQUOTE_NODE_NAME,
  EdybaraBlockQuotePluginConfigs,
  edybaraBlockQuotePlugins,
} from '@edybara/blockquote';
import {
  EDYBARA_CODEBLOCK_NODE_NAME,
  EdybaraCodeBlockPluginConfigs,
  edybaraCodeBlockPlugins,
} from '@edybara/codeblock';
import {
  EDYBARA_TABLE_CELL_DEFAULT_NODE_NAME,
  EDYBARA_TABLE_DEFAULT_NODE_NAME,
  EDYBARA_TABLE_ROW_DEFAULT_NODE_NAME,
  EdybaraTableEditingPluginConfigs,
  edybaraTableEditingPlugins,
  edybaraTablePlugins,
} from '@edybara/tables';
import {
  EdybaraMenubarPluginConfigs,
  edybaraMenubarPlugins,
} from '@edybara/menubar';
import { Schema } from '@edybara/pm/model';
import { EDYBARA_FONT_FAMILY_DEFAULT_MARK_NAME } from '@edybara/font-family';
import {
  EDYBARA_LINK_DEFAULT_MARK_NAME,
  EdybaraLinkPluginConfigs,
  edybaraLinkPlugins,
} from '@edybara/link';
// import {
//   EDYBARA_MENTION_DEFAULT_MARK_NAME,
//   EdybaraMentionPluginConfigs,
//   edybaraMentionPlugins,
// } from '@edybara/mention';
import { EDYBARA_TEXT_COLOR_DEFAULT_MARK_NAME } from '@edybara/text-color';

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
  // mention?: EdybaraMentionPluginConfigs | null;

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
      nodeType: schema.nodes[EDYBARA_PARAGRAPH_DEFAULT_NODE_NAME],
    },
    heading: {
      nodeType: schema.nodes[EDYBARA_HEADING_DEFAULT_NODE_NAME],
    },
    flatTaskList: {
      taskListNodeType: schema.nodes[EDYBARA_DEFAULT_FLAT_TASK_LIST_NODE_NAME],
      taskListItemNodeType:
        schema.nodes[EDYBARA_DEFAULT_FLAT_TASK_LIST_ITEM_NODE_NAME],
    },
    flatList: {
      bulletListNodeType: schema.nodes[EDYBARA_FLAT_BULLET_LIST_DEFAULT_NODE_NAME],
      orderedListNodeType:
        schema.nodes[EDYBARA_FLAT_ORDERED_LIST_DEFAULT_NODE_NAME],
      listItemNodeType: schema.nodes[EDYBARA_FLAT_LIST_ITEM_DEFAULT_NODE_NAME],
    },
    blockquote: {
      nodeType: schema.nodes[EDYBARA_BLOCKQUOTE_NODE_NAME],
    },
    horizontalRule: {
      nodeType: schema.nodes[EDYBARA_HORIZONTAL_RULE_NODE_NAME],
    },
    codeblock: {
      nodeType: schema.nodes[EDYBARA_CODEBLOCK_NODE_NAME],
    },
    table: {
      tableNodeType: schema.nodes[EDYBARA_TABLE_DEFAULT_NODE_NAME],
      tableRowNodeType: schema.nodes[EDYBARA_TABLE_ROW_DEFAULT_NODE_NAME],
      tableCellNodeType: schema.nodes[EDYBARA_TABLE_CELL_DEFAULT_NODE_NAME],
    },
    italic: {
      markType: schema.marks[EDYBARA_ITALIC_MARK_NAME],
    },
    bold: {
      markType: schema.marks[EDYBARA_BOLD_MARK_NAME],
    },
    code: {
      markType: schema.marks[EDYBARA_CODE_MARK_NAME],
    },
    underline: {
      markType: schema.marks[EDYBARA_UNDERLINE_MARK_NAME],
    },
    strikethrough: {
      markType: schema.marks[EDYBARA_STRIKETHROUGH_MARK_NAME],
    },
    subscript: {
      markType: schema.marks[EDYBARA_SUBSCRIPT_MARK_NAME],
    },
    superscript: {
      markType: schema.marks[EDYBARA_SUPERSCRIPT_MARK_NAME],
    },
    link: {
      markType: schema.marks[EDYBARA_LINK_DEFAULT_MARK_NAME],
    },
    // mention: {
    //   markType: schema.marks[EDYBARA_MENTION_DEFAULT_MARK_NAME],
    // },
    menubar: {
      textType: {
        paragraphNodeType: schema.nodes[EDYBARA_PARAGRAPH_DEFAULT_NODE_NAME],
        headingNodeType: schema.nodes[EDYBARA_HEADING_DEFAULT_NODE_NAME],
      },
      fontFamily: {
        fontFamilyMarkType: schema.marks[EDYBARA_FONT_FAMILY_DEFAULT_MARK_NAME],
      },
      textStyles: {
        boldMarkType: schema.marks[EDYBARA_BOLD_MARK_NAME],
        italicMarkType: schema.marks[EDYBARA_ITALIC_MARK_NAME],
        underlineMarkType: schema.marks[EDYBARA_UNDERLINE_MARK_NAME],
        strikethroughMarkType: schema.marks[EDYBARA_STRIKETHROUGH_MARK_NAME],
        codeMarkType: schema.marks[EDYBARA_CODE_MARK_NAME],
        subscriptMarkType: schema.marks[EDYBARA_SUBSCRIPT_MARK_NAME],
        superscriptMarkType: schema.marks[EDYBARA_SUPERSCRIPT_MARK_NAME],
        useClearButton: true,
      },
      textColor: {
        textColorMarkType: schema.marks[EDYBARA_TEXT_COLOR_DEFAULT_MARK_NAME],
      },
      list: {
        orderedListNodeType:
          schema.nodes[EDYBARA_FLAT_ORDERED_LIST_DEFAULT_NODE_NAME],
        bulletListNodeType:
          schema.nodes[EDYBARA_FLAT_BULLET_LIST_DEFAULT_NODE_NAME],
        listItemNodeType: schema.nodes[EDYBARA_FLAT_LIST_ITEM_DEFAULT_NODE_NAME],
      },
      taskList: {
        taskListNodeType: schema.nodes[EDYBARA_DEFAULT_FLAT_TASK_LIST_NODE_NAME],
        taskListItemNodeType:
          schema.nodes[EDYBARA_DEFAULT_FLAT_TASK_LIST_ITEM_NODE_NAME],
      },
      blockquote: {
        blockQuoteNodeType: schema.nodes[EDYBARA_BLOCKQUOTE_NODE_NAME],
      },
      codeblock: {
        codeBlockNodeType: schema.nodes[EDYBARA_CODEBLOCK_NODE_NAME],
      },
      table: {
        tableNodeType: schema.nodes[EDYBARA_TABLE_DEFAULT_NODE_NAME],
      },
      link: {
        linkMarkType: schema.marks[EDYBARA_LINK_DEFAULT_MARK_NAME],
      },
      // mention: {
      //   mentionMarkType: schema.marks[EDYBARA_MENTION_DEFAULT_MARK_NAME],
      // },
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
    plugins.push(...edybaraTablePlugins());
    plugins.push(...edybaraTableEditingPlugins());
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

  // if (mergedConfigs.mention) {
  //   plugins.push(...edybaraMentionPlugins(mergedConfigs.mention));
  // }

  if (mergedConfigs.menubar) {
    plugins.push(...edybaraMenubarPlugins(mergedConfigs.menubar));
  }

  plugins.push(...edybaraCorePlugins());

  return plugins;
};
