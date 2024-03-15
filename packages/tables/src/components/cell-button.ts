import { html, EdybaraSelect } from '@edybara-editor/ui';
import { Fragment } from 'preact';

export const EdybaraTableCellButtonWrapper = () => {
  return html`
    <${Fragment}>
      <${EdybaraSelect.Root} 
        className="edybara-icon-button">
      <${EdybaraSelect.OptionGroup}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Insert Column Before
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Insert Column After
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Insert Row Before
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Insert Row After
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Delete Column
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Delete Row 
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Delete Table
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Merge Cell
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Split Cell
        </${EdybaraSelect.Option}>
        <${EdybaraSelect.Option} value="${'asdf'}">
          Delete Cell Content
        </${EdybaraSelect.Option}>

      </${EdybaraSelect.OptionGroup}>
    </${EdybaraSelect.Root}> 
    </${Fragment}>
  `;
};
