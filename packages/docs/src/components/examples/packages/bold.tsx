import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState, Plugin } from 'prosemirror-state';
import React, { useState } from 'react';
import { Schema } from 'prosemirror-model';
import { edybaraBaseNodes, edybaraCorePlugins } from '@edybara-editor/core';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara-editor/paragraph';
import { edybaraMenubarPlugins } from '@edybara-editor/menubar';
import { edybaraBoldMarks, edybaraBoldPlugins } from '@edybara-editor/bold';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes(),
  },
  marks: {
    ...edybaraBoldMarks({
      markName: 'bold',
    }),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraBoldPlugins({
    markType: schema.marks['bold'],
  }),
  ...edybaraMenubarPlugins({
    textStyles: {
      boldMarkType: schema.marks['bold'],
    },
  }),
  ...edybaraCorePlugins(),
];

export const BoldExample = (props: ProseMirrorProps) => {
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
