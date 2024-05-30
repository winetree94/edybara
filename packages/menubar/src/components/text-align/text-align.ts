import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import { EdybaraSelect, EdybaraSeparator, classes, html } from '@edybara/ui';
import {
  TEXT_ALIGNMENT,
  selectionAlignments,
  setTextAlign,
} from '@edybara/core';

type ALIGNMENTS = 'left' | 'center' | 'right';

export const EdybaraMenubarTextAlignSelect = () => {
  const context = useContext(EdybaraMenubarContext);

  const alignments = selectionAlignments(context.editorView.state);
  let alignment: ALIGNMENTS = 'left';

  if (
    alignments?.filter((font, index, self) => self.indexOf(font) === index)
      .length === 1
  ) {
    alignment = alignments[0] || 'left';
  }

  const alignmentOptions = Object.values(TEXT_ALIGNMENT)
    .filter(Boolean)
    .map((align) => {
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
        alignment !== 'left' ? 'edybara-menubar-align-active' : '',
      )}"
      value="${alignment}">
      <${EdybaraSelect.Text}>
        <i className="ri-align-${alignment}" />
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
