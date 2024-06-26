import React, { useState } from 'react';
import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState } from '@edybara/pm/state';
import { edybaraPresetSchema, edybaraPresetPlugins } from '@edybara/preset';
import { edybaraMenubarPlugins } from '@edybara/menubar';

const schema = edybaraPresetSchema();
const plugins = edybaraPresetPlugins({
  schema,
  menubar: null,
});

plugins.push(
  ...edybaraMenubarPlugins({
    textType: {
      paragraphNodeType: schema.nodes['paragraph'],
      headingNodeType: schema.nodes['heading'],
    },
    fontFamily: {
      fontFamilyMarkType: schema.marks['font_family'],
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
  }),
);

export const MenubarExample = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
      schema: schema,
      plugins: plugins,
    }),
  );

  return (
    <ProseMirror
      state={state}
      style={{ height: '300px' }}
      className="border"
      {...props}
    />
  );
};
