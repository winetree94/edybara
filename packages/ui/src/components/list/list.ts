import { forwardRef, HTMLAttributes } from 'preact/compat';
import { classes } from '../../cdk/utils/core';
import { html } from '../../cdk/render';

export interface EdybaraOrderedListProps
  extends HTMLAttributes<HTMLOListElement> {}

export const EdybaraOrderedList = forwardRef<
  HTMLOListElement,
  EdybaraOrderedListProps
>(({ className, children, ...props }, ref) => {
  return html`
    <ol
      class=${classes('edybara-view-ordered-list', className)}
      ...${props}
      ref=${ref}
    >
      ${children}
    </ol>
  `;
});

export interface EdybaraUnorderedListProps
  extends HTMLAttributes<HTMLUListElement> {}

export const EdybaraUnorderedList = forwardRef<
  HTMLUListElement,
  EdybaraUnorderedListProps
>(({ className, children, ...props }, ref) => {
  return html`
    <ul
      class=${classes('edybara-view-unordered-list', className)}
      ...${props}
      ref=${ref}
    >
      ${children}
    </ul>
  `;
});

export interface EdybaraListItemProps extends HTMLAttributes<HTMLLIElement> {}

export const EdybaraListItem = forwardRef<HTMLLIElement, EdybaraListItemProps>(
  ({ className, children, ...props }, ref) => {
    return html`
      <li
        className=${classes('edybara-view-list-item', className)}
        ...${props}
        ref=${ref}
      >
        ${children}
      </li>
    `;
  },
);
