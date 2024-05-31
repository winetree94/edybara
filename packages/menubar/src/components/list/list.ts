import { EdybaraMenubarContext } from '../context';
import { useContext } from 'preact/hooks';
import { EdybaraButton, EdybaraSeparator, html } from '@edybara/ui';
import { indentListItem, toggleList } from '@edybara/flat-list';
import { findParentNode } from '@edybara/pm/utils';
import { selectionAllIsNode } from '@edybara/core';

export const EdybaraMenubarListToggleButtons = () => {
  const context = useContext(EdybaraMenubarContext);

  if (!context.options.list) {
    return null;
  }

  const orderedListNodeType = context.options.list.orderedListNodeType;
  const bulletListNodeType = context.options.list.bulletListNodeType;
  const listItemNodeType = context.options.list.listItemNodeType;

  const canOrderedList =
    orderedListNodeType &&
    toggleList({
      listType: orderedListNodeType,
      listItemType: listItemNodeType,
    })(context.editorView.state);

  const canBulletList =
    bulletListNodeType &&
    toggleList({
      listType: bulletListNodeType,
      listItemType: listItemNodeType,
    })(context.editorView.state);

  const canIndentListItem = indentListItem({
    listNodeTypes: [bulletListNodeType, orderedListNodeType],
    listItemNodeType: listItemNodeType,
    reduce: 1,
  })(context.editorView.state);

  const canDeindentListItem = indentListItem({
    listNodeTypes: [bulletListNodeType, orderedListNodeType],
    listItemNodeType: listItemNodeType,
    reduce: -1,
  })(context.editorView.state);

  const activeOrderedList =
    orderedListNodeType &&
    selectionAllIsNode(context.editorView.state, orderedListNodeType);

  const activeUnorderedList =
    bulletListNodeType &&
    selectionAllIsNode(context.editorView.state, bulletListNodeType);

  const onOrderedListClick = (): void => {
    toggleList({
      listType: orderedListNodeType,
      listItemType: listItemNodeType,
    })(context.editorView.state, context.editorView.dispatch);
    context.editorView.focus();
  };

  const onUnorderedListClick = (): void => {
    toggleList({
      listType: bulletListNodeType,
      listItemType: listItemNodeType,
    })(context.editorView.state, context.editorView.dispatch);
    context.editorView.focus();
  };

  const onIncreaseIndentClick = (): void => {
    indentListItem({
      listNodeTypes: [bulletListNodeType, orderedListNodeType],
      listItemNodeType: listItemNodeType,
      reduce: 1,
    })(context.editorView.state, context.editorView.dispatch);
    context.editorView.focus();
  };

  const onDecreaseIndentClick = (): void => {
    indentListItem({
      listNodeTypes: [bulletListNodeType, orderedListNodeType],
      listItemNodeType: listItemNodeType,
      reduce: -1,
    })(context.editorView.state, context.editorView.dispatch);
    context.editorView.focus();
  };

  return html`
    ${
      orderedListNodeType &&
      html`
      <${EdybaraButton}
        className="edybara-icon-button ${activeOrderedList ? 'selected' : ''}"
        disabled=${!canOrderedList}
        onClick=${() => onOrderedListClick()}
        >
        <i className="ri-list-ordered" />
      </${EdybaraButton}>
    `
    }
    ${
      bulletListNodeType &&
      html`
      <${EdybaraButton}
        className="edybara-icon-button ${activeUnorderedList ? 'selected' : ''}"
        disabled=${!canBulletList}
        onClick=${() => onUnorderedListClick()}
        >
        <i className="ri-list-unordered" />
      </${EdybaraButton}>
    `
    }
    <${EdybaraButton}
      className="edybara-icon-button"
      disabled=${!canDeindentListItem}
      onClick=${() => onDecreaseIndentClick()}
      >
      <i className="ri-indent-decrease" />
    </${EdybaraButton}>
    <${EdybaraButton}
      className="edybara-icon-button"
      disabled=${!canIndentListItem}
      onClick=${() => onIncreaseIndentClick()}
      >
      <i className="ri-indent-increase" />
    </${EdybaraButton}>
    <${EdybaraSeparator} className="edybara-view-menubar-separator" />
  `;
};
