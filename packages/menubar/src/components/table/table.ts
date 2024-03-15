import { EdybaraButton, html } from '@edybara-editor/ui';
import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import { insertTable } from '@edybara-editor/tables';

export const EdybaraMenubarTableButtons = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options.table) {
    return null;
  }

  return html`
    <${EdybaraButton}
      className="edybara-icon-button"
      onClick=${() => {
        insertTable()(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      }}>
      <i class="ri-table-2"></i>
    </${EdybaraButton}>
  `;
};
