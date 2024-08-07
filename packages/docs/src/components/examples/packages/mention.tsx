import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState, Plugin } from '@edybara/pm/state';
import React, { useState } from 'react';
import { Schema } from '@edybara/pm/model';
import {
  edybaraDocNodes,
  edybaraTextNodes,
  edybaraCorePlugins,
} from '@edybara/core';
import {
  edybaraParagraphNodes,
  edybaraParagraphPlugins,
} from '@edybara/paragraph';
import { edybaraMenubarPlugins } from '@edybara/menubar';
// import {
//   EdybaraMentionView,
//   edybaraMentionMarks,
//   edybaraMentionPlugins,
// } from '@edybara/mention';
import { faker } from '@faker-js/faker';

const persons = Array.from({ length: 200 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  icon: faker.image.avatar(),
}));

const schema = new Schema({
  nodes: {
    ...edybaraDocNodes(),
    ...edybaraTextNodes(),
    ...edybaraParagraphNodes(),
  },
  marks: {
    // ...edybaraMentionMarks({
    //   markName: 'mention',
    // }),
  },
});

const plugins: Plugin[] = [
  ...edybaraParagraphPlugins({
    nodeType: schema.nodes['paragraph'],
  }),
  // ...edybaraMentionPlugins({
  //   markType: schema.marks['mention'],
  //   commandView: (view, plugin) =>
  //     new EdybaraMentionView(view, plugin, (keyword) => {
  //       return persons.filter((person) =>
  //         person.name.toLowerCase().includes(keyword.toLowerCase()),
  //       );
  //     }),
  // }),
  ...edybaraMenubarPlugins({
    mention: {
      mentionMarkType: schema.marks['mention'],
    },
  }),
  ...edybaraCorePlugins(),
];

export const MentionExample = (props: ProseMirrorProps) => {
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
                text: 'Anna sed sapien ',
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'mention',
                    attrs: {
                      data_id: persons[0].id,
                    },
                  },
                ],
                text: `@${persons[0].name}`,
              },
              {
                type: 'text',
                text: ' justo varius tempor. Duis aute irure ',
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'mention',
                    attrs: {
                      data_id: persons[1].id,
                    },
                  },
                ],
                text: `@${persons[1].name}`,
              },
              {
                type: 'text',
                text: ' in reprehenderit in voluptate velit esse cillum dolore eu ',
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'mention',
                    attrs: {
                      data_id: persons[2].id,
                    },
                  },
                ],
                text: `@${persons[2].name}`,
              },
              {
                type: 'text',
                text: ' nulla pariatur. Michael excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ',
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
            type: 'paragraph',
            attrs: {
              align: 'left',
            },
            content: [
              {
                type: 'text',
                text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'mention',
                    attrs: {
                      data_id: persons[3].id,
                    },
                  },
                ],
                text: `@${persons[3].name}`,
              },
              {
                type: 'text',
                text: ' nisi ut aliquip ex ea commodo ',
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'mention',
                    attrs: {
                      data_id: persons[4].id,
                    },
                  },
                ],
                text: `@${persons[4].name}`,
              },
              {
                type: 'text',
                text: '. David duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
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
