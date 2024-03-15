import { EdybaraButton, html } from '@edybara-editor/ui';
import { addMention } from '@edybara-editor/mention';
import { useContext } from 'preact/hooks';
import { EdybaraMenubarContext } from '../context';

export const EdybaraMenubarMentionButtons = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options.mention) {
    return null;
  }

  return html`
    <${EdybaraButton}
      className="edybara-icon-button"
      onClick=${() => {
        addMention()(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      }}>
      <i class="ri-at-line"></i>
    </${EdybaraButton}>
  `;
};
