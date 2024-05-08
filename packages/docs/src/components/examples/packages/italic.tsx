import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState, Plugin } from '@edybara/pm/state';
import React, { useState } from 'react';
import { Schema } from '@edybara/pm/model';
import { edybaraBaseNodes, edybaraCorePlugins } from '@edybara/core';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import { edybaraMenubarPlugins } from '@edybara/menubar';
import { edybaraItalicMarks, edybaraItalicPlugins } from '@edybara/italic';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes(),
  },
  marks: {
    ...edybaraItalicMarks({
      markName: 'em',
    }),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraItalicPlugins({
    markType: schema.marks['em'],
  }),
  ...edybaraMenubarPlugins({
    textStyles: {
      italicMarkType: schema.marks['em'],
    },
  }),
  ...edybaraCorePlugins(),
];

export const ItalicExample = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
      doc: schema.nodeFromJSON({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a minimal example of a ProseMirror editor with a few plugins.',
              },
            ],
          },
        ],
      }),
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
