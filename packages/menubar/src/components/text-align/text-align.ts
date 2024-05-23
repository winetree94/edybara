import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import { EdybaraSelect, EdybaraSeparator, classes, html } from '@edybara/ui';
import {
  TEXT_ALIGNMENT,
  getRangeFirstAlignment,
  setTextAlign,
} from '@edybara/core';

export const EdybaraMenubarTextAlignSelect = () => {
  const context = useContext(EdybaraMenubarContext);

  const firstAlignment =
    getRangeFirstAlignment(context.editorView.state) || 'left';

  const alignmentOptions = Object.values(TEXT_ALIGNMENT).map((align) => {
    return {
      value: align,
      icon: html`<i className="ri-align-${align}" />`,
      command: () => {
        setTextAlign(align)(
          context.editorView.state,
          context.editorView.dispatch,
        );
        context.editorView.focus();
      },
    };
  });

  return html`
    <${EdybaraSelect.Root} 
      className="${classes(
        'edybara-menubar-align-select',
        firstAlignment !== 'left' ? 'edybara-menubar-align-active' : '',
      )}"
      value="${firstAlignment}">
      <${EdybaraSelect.Text}>
        <i className="ri-align-${firstAlignment}" />
      </${EdybaraSelect.Text}>
      <${EdybaraSelect.OptionGroup} 
        matchWidth="${true}"
        className="edybara-menubar-align-list">
      ${alignmentOptions.map(
        (option) => html`
        <${EdybaraSelect.Option} className="edybara-menubar-align-option" value="${option.value}" onClick=${option.command}>
          <i className="ri-align-${option.value}" />
        </${EdybaraSelect.Option}>
      `,
      )}
      </${EdybaraSelect.OptionGroup}>
    </${EdybaraSelect.Root}>
    <${EdybaraSeparator} className="edybara-view-menubar-separator" />
  `;
};
