import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import {
  EdybaraHeadingByNumber,
  EdybaraParagraph,
  EdybaraSelect,
  EdybaraShortCut,
  classes,
  html,
} from '@edybara/ui';
import { EdybaraHeadingNodeSpec, setHeading } from '@edybara/heading';
import { mac } from '@edybara/core';
import { selectionTextType } from '../../utils';
import { setParagraph } from '@edybara/paragraph';

export const EdybaraMenubarTextTypeSelect = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options?.textType) {
    return null;
  }

  const paragraphNodeType = context.options.textType.paragraphNodeType;
  const headingNodeType = context.options.textType.headingNodeType;
  const headingNodeSpec = headingNodeType.spec as EdybaraHeadingNodeSpec;

  const textType = selectionTextType(context.editorView.state);

  const textTypeOptions = [
    ...headingNodeSpec.meta.levels.map((level) => ({
      value: `h${level}`,
      label: `Heading ${level}`,
      Element: EdybaraHeadingByNumber[level],
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌥⌘' : 'Ctrl+Alt+'}${level}
        </${EdybaraShortCut}> 
      `,
      command: () => {
        setHeading(headingNodeType, {
          level,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    })),
    {
      value: 'p',
      label: 'Normal',
      Element: EdybaraParagraph,
      shortcut: html`
        <${EdybaraShortCut}>⌥⌘0</${EdybaraShortCut}> 
      `,
      command: () => {
        setParagraph(paragraphNodeType)(
          context.editorView.state,
          context.editorView.dispatch,
        );
        context.editorView.focus();
      },
    },
  ];

  return html`
    <${EdybaraSelect.Root} 
      className="${classes(
        'edybara-menubar-text-select',
        textType !== 'p' ? 'edybara-heading-selected' : '',
      )}"
      value="${textType}">
      <${EdybaraSelect.Text}>
        <${EdybaraParagraph}>
          ${
            textTypeOptions.find((option) => option.value === textType)
              ?.label || ''
          }
        </${EdybaraParagraph}>
      </${EdybaraSelect.Text}>
      <${EdybaraSelect.OptionGroup}>
        ${textTypeOptions.map((option) => {
          return html`
            <${EdybaraSelect.Option} value="${option.value}" onClick=${option.command}>
              <${option.Element} className="edybara-menubar-select-text-type">${option.label}</${option.Element}> 
              ${option.shortcut}
            </${EdybaraSelect.Option}>
          `;
        })}
      </${EdybaraSelect.OptionGroup}>
    </${EdybaraSelect.Root}> 
  `;
};
