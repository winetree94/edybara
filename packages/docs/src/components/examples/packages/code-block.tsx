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
import {
  edybaraCodeBlockNodes,
  edybaraCodeBlockPlugins,
} from '@edybara-editor/codeblock';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes(),
    ...edybaraCodeBlockNodes({
      nodeName: 'code_block',
    }),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraCodeBlockPlugins({
    nodeType: schema.nodes['code_block'],
    mergeAdjacentCodeBlock: true,
  }),
  ...edybaraMenubarPlugins({
    codeblock: {
      codeBlockNodeType: schema.nodes['code_block'],
    },
  }),
  ...edybaraCorePlugins(),
];

export const CodeBlockExample = (props: ProseMirrorProps) => {
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
