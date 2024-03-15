import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState } from 'prosemirror-state';
import React, { useState } from 'react';
import { edybaraPresetSchema, edybaraPresetPlugins } from '@edybara-editor/preset';
import doc from '@site/src/pages/lorem-ipsum.json';
import { Node } from 'prosemirror-model';
import { faker } from '@faker-js/faker';
import { EdybaraMentionView } from '@edybara-editor/mention';

const persons = Array.from({ length: 200 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  icon: faker.image.avatar(),
}));

const schema = edybaraPresetSchema();
const plugins = edybaraPresetPlugins({
  schema,
  mention: {
    markType: schema.marks['mention'],
    commandView: (view, plugin) =>
      new EdybaraMentionView(view, plugin, (keyword) => {
        return persons.filter((person) =>
          person.name.toLowerCase().includes(keyword.toLowerCase()),
        );
      }),
  },
});

export const PresetExample = (props: ProseMirrorProps) => {
  const [state] = useState(
    EditorState.create({
      doc: Node.fromJSON(schema, doc),
      schema: schema,
      plugins: plugins,
    }),
  );

  return <ProseMirror state={state} {...props} />;
};
