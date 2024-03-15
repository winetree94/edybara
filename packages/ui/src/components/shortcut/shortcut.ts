import { ComponentChildren } from 'preact';
import { html } from '../../cdk';

export interface EdybaraShortcutProps {
  children: ComponentChildren;
}

export const EdybaraShortCut = (props: EdybaraShortcutProps) => {
  return html`<span className="edybara-ui-shortcut">${props.children}</span>`;
};
