import { MarkSpec, NodeSpec, Schema } from '@edybara/pm/model';
import { edybaraDocNodes, edybaraTextNodes } from '@edybara/core';
import {
  EdybaraHeadingNodeConfigs,
  edybaraHeadingNodes,
} from '@edybara/heading';
import {
  EdybaraParagraphNodeConfigs,
  edybaraParagraphNodes,
} from '@edybara/paragraph';
import {
  EdybaraFlatListItemNodeConfigs,
  edybaraFlatBulletListNodes,
  edybaraFlatListItemNodes,
  edybaraFlatOrderedListNodes,
} from '@edybara/flat-list';
import {
  edybaraFlatTaskListNodes,
  edybaraFlatTaskListItemNodes,
} from '@edybara/flat-task-list';
import { edybaraHorizontalRuleNodes } from '@edybara/hr';
import { edybaraLinkMarks } from '@edybara/link';
import { edybaraBoldMarks } from '@edybara/bold';
import { edybaraCodeMarks } from '@edybara/code';
import {
  EdybaraFontFamilyMarkConfigs,
  edybaraFontFamilyMarks,
} from '@edybara/font-family';
import { edybaraItalicMarks } from '@edybara/italic';
import { edybaraStrikethroughMarks } from '@edybara/strikethrough';
import {
  EdybaraSubscriptMarkConfigs,
  edybaraSubscriptMarks,
} from '@edybara/subscript';
import {
  EdybaraSuperscriptMarkConfigs,
  edybaraSuperscriptMarks,
} from '@edybara/superscript';
import {
  EdybaraTextColorMarkConfigs,
  edybaraTextColorMarks,
} from '@edybara/text-color';
import { edybaraUnderlineMarks } from '@edybara/underline';
import {
  EdybaraBlockquoteNodeConfigs,
  edybaraBlockquoteNodes,
} from '@edybara/blockquote';
import { edybaraCodeBlockNodes } from '@edybara/codeblock';
import { edybaraTableNodes } from '@edybara/tables';

export interface EdybaraPresetSchemaConfigs {
  paragraph?: EdybaraParagraphNodeConfigs | null;
  heading?: EdybaraHeadingNodeConfigs | null;
  flatTaskList?: boolean | null;
  flatTaskListItem?: boolean | null;
  flatBulletList?: boolean | null;
  flatOrderedList?: boolean | null;
  flatListItem?: EdybaraFlatListItemNodeConfigs | null;
  blockquote?: EdybaraBlockquoteNodeConfigs | null;
  horizontalRule?: boolean | null;
  codeblock?: boolean | null;
  table?: boolean | null;

  bold?: boolean | null;
  italic?: boolean | null;
  underline?: boolean | null;
  strikethrough?: boolean | null;
  code?: boolean | null;
  subscript?: EdybaraSubscriptMarkConfigs | null;
  superscript?: EdybaraSuperscriptMarkConfigs | null;
  fontFamily?: EdybaraFontFamilyMarkConfigs | null;
  textColor?: EdybaraTextColorMarkConfigs | null;
  link?: boolean | null;
}

const DEFAULT_CONFIGS: Required<EdybaraPresetSchemaConfigs> = {
  // nodes
  paragraph: {},
  heading: {},
  flatTaskList: true,
  flatTaskListItem: true,
  flatBulletList: true,
  flatOrderedList: true,
  flatListItem: {},
  blockquote: {},
  horizontalRule: true,
  codeblock: true,
  table: true,

  // marks
  bold: true,
  italic: true,
  underline: true,
  strikethrough: true,
  code: true,
  subscript: {
    superscriptMarkName: 'superscript',
  },
  superscript: {
    subscriptMarkName: 'subscript',
  },
  fontFamily: {},
  textColor: {},
  link: true,
  // mention: {},
};

export const edybaraPresetSchema = (configs?: EdybaraPresetSchemaConfigs) => {
  const mergedConfigs = {
    ...DEFAULT_CONFIGS,
    ...configs,
  };

  const spec: {
    nodes: Record<string, NodeSpec>;
    marks: Record<string, MarkSpec>;
  } = {
    nodes: {
      ...edybaraDocNodes(),
      ...edybaraTextNodes(),
    },
    marks: {},
  };

  if (mergedConfigs.paragraph) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraParagraphNodes(mergedConfigs.paragraph),
    };
  }

  if (mergedConfigs.heading) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraHeadingNodes(mergedConfigs.heading),
    };
  }

  if (mergedConfigs.flatTaskList) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatTaskListNodes(),
    };
  }

  if (mergedConfigs.flatTaskListItem) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatTaskListItemNodes(),
    };
  }

  if (mergedConfigs.flatBulletList) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatBulletListNodes(),
    };
  }

  if (mergedConfigs.flatOrderedList) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatOrderedListNodes(),
    };
  }

  if (mergedConfigs.flatListItem) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraFlatListItemNodes(mergedConfigs.flatListItem),
    };
  }

  if (mergedConfigs.blockquote) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraBlockquoteNodes(mergedConfigs.blockquote),
    };
  }

  if (mergedConfigs.horizontalRule) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraHorizontalRuleNodes(),
    };
  }

  if (mergedConfigs.codeblock) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraCodeBlockNodes(),
    };
  }

  if (mergedConfigs.table) {
    spec.nodes = {
      ...spec.nodes,
      ...edybaraTableNodes(),
    };
  }

  if (mergedConfigs.bold) {
    spec.marks = {
      ...spec.marks,
      ...edybaraBoldMarks(),
    };
  }

  if (mergedConfigs.italic) {
    spec.marks = {
      ...spec.marks,
      ...edybaraItalicMarks(),
    };
  }

  if (mergedConfigs.underline) {
    spec.marks = {
      ...spec.marks,
      ...edybaraUnderlineMarks(),
    };
  }

  if (mergedConfigs.strikethrough) {
    spec.marks = {
      ...spec.marks,
      ...edybaraStrikethroughMarks(),
    };
  }

  if (mergedConfigs.code) {
    spec.marks = {
      ...spec.marks,
      ...edybaraCodeMarks(),
    };
  }

  if (mergedConfigs.subscript) {
    spec.marks = {
      ...spec.marks,
      ...edybaraSubscriptMarks(mergedConfigs.subscript),
    };
  }

  if (mergedConfigs.superscript) {
    spec.marks = {
      ...spec.marks,
      ...edybaraSuperscriptMarks(mergedConfigs.superscript),
    };
  }

  if (mergedConfigs.fontFamily) {
    spec.marks = {
      ...spec.marks,
      ...edybaraFontFamilyMarks(mergedConfigs.fontFamily),
    };
  }

  if (mergedConfigs.textColor) {
    spec.marks = {
      ...spec.marks,
      ...edybaraTextColorMarks(mergedConfigs.textColor),
    };
  }

  if (mergedConfigs.link) {
    spec.marks = {
      ...spec.marks,
      ...edybaraLinkMarks(),
    };
  }

  // if (mergedConfigs.mention) {
  //   spec.marks = {
  //     ...spec.marks,
  //     ...edybaraMentionMarks(mergedConfigs.mention),
  //   };
  // }

  return new Schema(spec);
};
