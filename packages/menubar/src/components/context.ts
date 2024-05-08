import { EdybaraMenubarPluginConfigs } from '../plugins';
import { createContext } from 'preact';
import { EditorState } from '@edybara/pm/state';
import { EditorView } from '@edybara/pm/view';

export interface EdybaraMenubarContextType {
  editorView: EditorView;
  editorState: EditorState;
  options: EdybaraMenubarPluginConfigs;
}

export const EdybaraMenubarContext = createContext<EdybaraMenubarContextType>({
  editorView: null as any,
  editorState: null as any,
  options: null as any,
});
