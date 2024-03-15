import { JSX } from 'preact';
import { forwardRef } from 'preact/compat';
import { classes, html } from '../../cdk';

export interface EdybaraAnchorProps
  extends JSX.HTMLAttributes<HTMLButtonElement> {}

export const EdybaraAnchor = forwardRef<HTMLAnchorElement, EdybaraAnchorProps>(
  ({ children, className, ...props }, ref) => {
    return html`
      <a class="${classes('edybara-anchor', className)}" ...${props} ref="${ref}">
        ${children}
      </a>
    `;
  },
);
