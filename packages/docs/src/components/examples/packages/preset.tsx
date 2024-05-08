import {
  ProseMirror,
  ProseMirrorProps,
} from '@site/src/components/editor/prose-mirror';
import { EditorState } from '@edybara/pm/state';
import React, { useRef, useState } from 'react';
import { edybaraPresetSchema, edybaraPresetPlugins } from '@edybara/preset';
import doc from '@site/src/pages/lorem-ipsum.json';
import { Node } from '@edybara/pm/model';
import { edybaraDevkitCodeMirrorPlugins } from '@edybara/devkit';

export const PresetExample = (props: ProseMirrorProps) => {
  const schema = useRef(edybaraPresetSchema());
  const plugins = useRef([
    ...edybaraPresetPlugins({
      schema: schema.current,
    }),
    ...edybaraDevkitCodeMirrorPlugins(),
  ]);

  const [state] = useState(
    EditorState.create({
      doc: Node.fromJSON(schema.current, doc),
      schema: schema.current,
      plugins: plugins.current,
    }),
  );

  return <ProseMirror state={state} {...props} />;
};
