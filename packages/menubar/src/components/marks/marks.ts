import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import {
  EdybaraButton,
  EdybaraParagraph,
  EdybaraSelect,
  EdybaraSeparator,
  EdybaraShortCut,
  html,
} from '@edybara/ui';
import {
  clearMarks,
  mac,
  markActive,
  selectionAllHasMark,
  toggleMark,
} from '@edybara/core';
import { Attributes, VNode } from 'preact';
import { EditorState } from '@edybara/pm/state';
import { MarkType } from '@edybara/pm/model';

export interface EdybaraMenubarMarkButton {
  iconName: string;
  label: string;
  active: boolean;
  shortcut: VNode<Attributes> | VNode<Attributes>[];
  command: () => void;
}

// 선택된 범위 내 모든 노드가 특정 mark를 포함하는지 확인하는 함수
function allNodesHaveMark(state: EditorState, markType: MarkType) {
  const { from, to } = state.selection;
  let hasMark = true;

  state.doc.nodesBetween(from, to, (node) => {
    if (node.isText && !markType.isInSet(node.marks)) {
      hasMark = false;
      return false; // stop iteration
    }
    return true; // continue iteration
  });

  return hasMark;
}

export const EdybaraMenubarMarkToggleButtons = () => {
  const context = useContext(EdybaraMenubarContext);
  const {
    editorView: { state, dispatch },
  } = context;

  if (!context.options.textStyles) {
    return html`<></>`;
  }

  const boldMarkType = context.options.textStyles.boldMarkType;
  const italicMarkType = context.options.textStyles.italicMarkType;
  const underlineMarkType = context.options.textStyles.underlineMarkType;
  const strikethroughMarkType =
    context.options.textStyles.strikethroughMarkType;
  const codeMarkType = context.options.textStyles.codeMarkType;
  const subscriptMarkType = context.options.textStyles.subscriptMarkType;
  const superscriptMarkType = context.options.textStyles.superscriptMarkType;
  const useClearButton = context.options.textStyles.useClearButton;

  const hasMark = !!Object.values(context.editorState.schema.marks).length;

  if (!hasMark) {
    return html`<></>`;
  }

  const buttons: EdybaraMenubarMarkButton[] = [];

  state.doc;

  if (boldMarkType) {
    buttons.push({
      iconName: 'ri-bold',
      label: 'Bold',
      active: allNodesHaveMark(context.editorView.state, boldMarkType),
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌘' : 'Ctrl+'}B
        </${EdybaraShortCut}>
      `,
      command: () => {
        toggleMark(boldMarkType, null, {
          removeWhenPresent: false,
        })(state, dispatch);
        context.editorView.focus();
      },
    });
  }

  if (italicMarkType) {
    buttons.push({
      iconName: 'ri-italic',
      label: 'Italic',
      active: !!markActive(context.editorView.state, italicMarkType),
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌘' : 'Ctrl+'}I
        </${EdybaraShortCut}>
      `,
      command: () => {
        toggleMark(italicMarkType, null, {
          removeWhenPresent: false,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    });
  }

  if (underlineMarkType) {
    buttons.push({
      iconName: 'ri-underline',
      label: 'Underline',
      active: !!markActive(context.editorView.state, underlineMarkType),
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌘' : 'Ctrl+'}U
        </${EdybaraShortCut}>
      `,
      command: () => {
        toggleMark(underlineMarkType, null, {
          removeWhenPresent: false,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    });
  }

  if (strikethroughMarkType) {
    buttons.push({
      iconName: 'ri-strikethrough-2',
      label: 'Strikethrough',
      active: !!markActive(context.editorView.state, strikethroughMarkType),
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌘⇧' : 'Ctrl+Shift+'}S
        </${EdybaraShortCut}>
      `,
      command: () => {
        toggleMark(strikethroughMarkType, null, {
          removeWhenPresent: false,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    });
  }

  if (codeMarkType) {
    buttons.push({
      iconName: 'ri-code-line',
      label: 'Inline Code',
      active: !!markActive(context.editorView.state, codeMarkType),
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌘⇧' : 'Ctrl+Shift+'}M
        </${EdybaraShortCut}>
      `,
      command: () => {
        toggleMark(codeMarkType, null, {
          removeWhenPresent: false,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    });
  }

  if (subscriptMarkType) {
    buttons.push({
      iconName: 'ri-subscript',
      label: 'Subscript',
      active: !!markActive(context.editorView.state, subscriptMarkType),
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌘⇧' : 'Ctrl+Shift+'},
        </${EdybaraShortCut}>
      `,
      command: () => {
        toggleMark(subscriptMarkType, null, {
          removeWhenPresent: false,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    });
  }

  if (superscriptMarkType) {
    buttons.push({
      iconName: 'ri-superscript',
      label: 'Superscript',
      active: !!markActive(context.editorView.state, superscriptMarkType),
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌘⇧' : 'Ctrl+Shift+'}.
        </${EdybaraShortCut}>
      `,
      command: () => {
        toggleMark(superscriptMarkType, null, {
          removeWhenPresent: false,
        })(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    });
  }

  if (useClearButton) {
    buttons.push({
      iconName: 'ri-format-clear',
      label: 'Clear Format',
      active: false,
      shortcut: html`
        <${EdybaraShortCut}>
          ${mac ? '⌘' : 'Ctrl+'}\\
        </${EdybaraShortCut}>
      `,
      command: () => {
        clearMarks()(context.editorView.state, context.editorView.dispatch);
        context.editorView.focus();
      },
    });
  }

  const contextButtons = buttons.splice(2);
  if (contextButtons.length === 1) {
    buttons.push(...contextButtons.splice(0, 1));
  }

  const contextActive = contextButtons.some((button) => button.active);

  return html`
    ${buttons.map(
      (button) => html`
      <${EdybaraButton}
        className="edybara-icon-button ${button.active ? 'selected' : ''}"
        onClick=${button.command}>
        <i className="${button.iconName}" />
      </${EdybaraButton}>
    `,
    )}
    ${contextButtons.length > 1 &&
    html`
     <${EdybaraSelect.Root} 
      hideArrow="${true}"
      className="edybara-icon-button ${contextActive ? 'selected' : ''}">
      <${EdybaraSelect.Text}>
        <i class="ri-more-fill"></i>
      </${EdybaraSelect.Text}>
      <${EdybaraSelect.OptionGroup} 
        className="edybara-menubar-more-marks-list">
        ${contextButtons.map(
          (button) => html`
          <${EdybaraSelect.Option}
            onClick="${button.command}"
            value="${button.iconName}"
            className="${button.active ? 'edybara-active' : ''}">
            <i className="${button.iconName}" />
            <${EdybaraParagraph} 
              className="edybara-menubar-more-marks-description">
              ${button.label}
            </${EdybaraParagraph}>
            ${button.shortcut}
          </${EdybaraSelect.Option}>
        `,
        )}
      </${EdybaraSelect.OptionGroup}>
    </${EdybaraSelect.Root}>   
    `}
    <${EdybaraSeparator} className="edybara-view-menubar-separator" />
  `;
};
