import './style.scss';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  edybaraPresetSchema,
  edybaraPresetPlugins,
} from '@edybara-editor/preset';

const schema = edybaraPresetSchema();
const plugins = edybaraPresetPlugins({ schema });

const state = EditorState.create({
  schema: schema,
  plugins: plugins,
});

const view = new EditorView(document.querySelector('#editor'), {
  state: state,
  attributes: {
    spellcheck: 'false',
  },
});

console.log(view);
