import './style.scss';
import { EditorState } from '@edybara/pm/state';
import { EditorView } from '@edybara/pm/view';
import { edybaraPresetSchema, edybaraPresetPlugins } from '@edybara/preset';

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
