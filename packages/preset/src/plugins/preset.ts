import { Plugin as PMPlugin, Plugin } from '@edybara/pm/state';
import { edybaraCorePlugins } from '@edybara/core';
import {
  EdybaraHeadingPluginConfigs,
  edybaraHeadingPlugins,
} from '@edybara/heading';
import {
  EdybaraParagraphPluginConfigs,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import {
  EdybaraFlatListPluginConfigs,
  edybaraFlatListPlugins,
} from '@edybara/flat-list';
import {
  EdybaraFlatTaskListPluginConfigs,
  edybaraFlatTaskListPlugins,
} from '@edybara/flat-task-list';
import {
  EdybaraHorizontalRulePluginConfigs,
  edybaraHorizontalRulePlugins,
} from '@edybara/hr';
import { EdybaraBoldPluginConfigs, edybaraBoldPlugins } from '@edybara/bold';
import { EdybaraCodePluginConfigs, edybaraCodePlugins } from '@edybara/code';
import {
  EdybaraItalicPluginConfigs,
  edybaraItalicPlugins,
} from '@edybara/italic';
import {
  EdybaraStrikethroughPluginConfigs,
  edybaraStrikethroughPlugins,
} from '@edybara/strikethrough';
import {
  EdybaraSubscriptPluginConfigs,
  edybaraSubscriptPlugins,
} from '@edybara/subscript';
import {
  EdybaraSuperscriptPluginConfigs,
  edybaraSuperscriptPlugins,
} from '@edybara/superscript';
import {
  EdybaraUnderlinePluginConfigs,
  edybaraUnderlinePlugins,
} from '@edybara/underline';
import {
  EdybaraBlockQuotePluginConfigs,
  edybaraBlockQuotePlugins,
} from '@edybara/blockquote';
import {
  EdybaraCodeBlockPluginConfigs,
  edybaraCodeBlockPlugins,
} from '@edybara/codeblock';
import {
  edybaraTableEditingPlugins,
  edybaraTablePlugins,
} from '@edybara/tables';
import {
  EdybaraMenubarPluginConfigs,
  edybaraMenubarPlugins,
} from '@edybara/menubar';
import { Schema } from '@edybara/pm/model';
import { EdybaraLinkPluginConfigs, edybaraLinkPlugins } from '@edybara/link';

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
  table?: boolean | null;

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
      nodeType: schema.nodes['paragraph'],
    },
    heading: {
      nodeType: schema.nodes['heading'],
    },
    flatTaskList: {
      taskListNodeType: schema.nodes['task_list'],
      taskListItemNodeType: schema.nodes['task_list_item'],
    },
    flatList: {
      bulletListNodeType: schema.nodes['bullet_list'],
      orderedListNodeType: schema.nodes['ordered_list'],
      listItemNodeType: schema.nodes['list_item'],
    },
    blockquote: {
      nodeType: schema.nodes['blockquote'],
    },
    horizontalRule: {
      nodeType: schema.nodes['hr'],
    },
    codeblock: {
      nodeType: schema.nodes['code_block'],
    },
    table: true,
    italic: {
      markType: schema.marks['italic'],
    },
    bold: {
      markType: schema.marks['bold'],
    },
    code: {
      markType: schema.marks['code'],
    },
    underline: {
      markType: schema.marks['underline'],
    },
    strikethrough: {
      markType: schema.marks['strikethrough'],
    },
    subscript: {
      markType: schema.marks['subscript'],
    },
    superscript: {
      markType: schema.marks['superscript'],
    },
    link: {
      markType: schema.marks['link'],
    },
    menubar: {
      textType: {
        paragraphNodeType: schema.nodes['paragraph'],
        headingNodeType: schema.nodes['heading'],
      },
      fontFamily: {
        fontFamilyMarkType: schema.marks['font'],
      },
      textStyles: {
        boldMarkType: schema.marks['bold'],
        italicMarkType: schema.marks['italic'],
        underlineMarkType: schema.marks['underline'],
        strikethroughMarkType: schema.marks['strikethrough'],
        codeMarkType: schema.marks['code'],
        subscriptMarkType: schema.marks['subscript'],
        superscriptMarkType: schema.marks['superscript'],
        useClearButton: true,
      },
      textColor: {
        textColorMarkType: schema.marks['text_color'],
      },
      list: {
        orderedListNodeType: schema.nodes['ordered_list'],
        bulletListNodeType: schema.nodes['bullet_list'],
        listItemNodeType: schema.nodes['list_item'],
      },
      taskList: {
        taskListNodeType: schema.nodes['task_list'],
        taskListItemNodeType: schema.nodes['task_list_item'],
      },
      blockquote: {
        blockQuoteNodeType: schema.nodes['blockquote'],
      },
      codeblock: {
        codeBlockNodeType: schema.nodes['code_block'],
      },
      table: {
        tableNodeType: schema.nodes['table'],
      },
      link: {
        linkMarkType: schema.marks['link'],
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

  if (mergedConfigs.menubar) {
    plugins.push(...edybaraMenubarPlugins(mergedConfigs.menubar));
  }

  plugins.push(...edybaraCorePlugins());

  return plugins;
};
