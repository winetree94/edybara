/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState, Plugin } from 'prosemirror-state';
import React, { useState } from 'react';
import { Schema } from 'prosemirror-model';
import { edybaraBaseNodes, edybaraCorePlugins } from '@edybara/core';
import { edybaraMenubarPlugins } from '@edybara/menubar';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import {
  edybaraHeadingInputRulePlugins,
  edybaraHeadingKeymapPlugins,
  edybaraHeadingNodes,
  edybaraHeadingPlugins,
} from '@edybara/heading';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes(),
    ...edybaraHeadingNodes({
      nodeName: 'heading',
      allowAlign: true,
      levels: [2, 4, 6],
    }),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraHeadingPlugins({
    nodeType: schema.nodes['heading'],
  }),
  // ...edybaraHeadingKeymapPlugins({
  //   nodeType: schema.nodes['heading'],
  //   level: 6,
  // }),
  // ...edybaraHeadingInputRulePlugins({
  //   nodeType: schema.nodes['heading'],
  //   level: 6,
  // }),
  ...edybaraMenubarPlugins({
    textType: {
      headingNodeType: schema.nodes['heading'],
      paragraphNodeType: schema.nodes['paragraph'],
    },
    align: {},
  }),
  ...edybaraCorePlugins(),
];

export const HeadingExample = (props: ProseMirrorProps) => {
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
