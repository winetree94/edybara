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
import {
  edybaraFlatOrderedListNodes,
  edybaraFlatBulletListNodes,
  edybaraFlatListItemNodes,
  edybaraFlatListPlugins,
} from '@edybara/flat-list';

const schema = new Schema({
  nodes: {
    ...edybaraBaseNodes(),
    ...edybaraParagraphNodes(),
    ...edybaraFlatOrderedListNodes({
      nodeName: 'ordered_list',
    }),
    ...edybaraFlatBulletListNodes({
      nodeName: 'bullet_list',
    }),
    ...edybaraFlatListItemNodes({
      nodeName: 'list_item',
    }),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  ...edybaraFlatListPlugins({
    orderedListNodeType: schema.nodes['ordered_list'],
    bulletListNodeType: schema.nodes['bullet_list'],
    listItemNodeType: schema.nodes['list_item'],
  }),
  ...edybaraMenubarPlugins({
    list: {
      orderedListNodeType: schema.nodes['ordered_list'],
      bulletListNodeType: schema.nodes['bullet_list'],
      listItemNodeType: schema.nodes['list_item'],
    },
    align: {},
  }),
  ...edybaraCorePlugins(),
];

export const FlatListExample = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
      doc: schema.nodeFromJSON({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            attrs: {
              align: 'left',
            },
            content: [
              {
                type: 'text',
                text: 'This is a minimal example of a ProseMirror editor with a few plugins.',
              },
            ],
          },
          {
            type: 'paragraph',
            attrs: {
              align: 'left',
            },
          },
          {
            type: 'ordered_list',
            content: [
              {
                type: 'list_item',
                attrs: {
                  indent: 1,
                  align: 'left',
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'alsdkfj',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'list_item',
                attrs: {
                  indent: 2,
                  align: 'left',
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'asdflaskdjf',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'list_item',
                attrs: {
                  indent: 3,
                  align: 'left',
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'aklsdjf',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'list_item',
                attrs: {
                  indent: 4,
                  align: 'left',
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'asldkfj',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'bullet_list',
            content: [
              {
                type: 'list_item',
                attrs: {
                  indent: 1,
                  align: 'left',
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'alksdjf',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'list_item',
                attrs: {
                  indent: 3,
                  align: 'left',
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'aslkdfj',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'list_item',
                attrs: {
                  indent: 2,
                  align: 'left',
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'laksdjfalskdjf',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'list_item',
                attrs: {
                  indent: 4,
                  align: 'left',
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      align: 'left',
                    },
                    content: [
                      {
                        type: 'text',
                        text: 'alsdkjfaslkdfj',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'paragraph',
            attrs: {
              align: 'left',
            },
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
