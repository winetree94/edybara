import { Attributes, VNode } from 'preact';
import { createPortal } from 'preact/compat';

const overlayContainer = ((): HTMLDivElement => {
  const exist = document.querySelector(
    'div.edybara-overlay-container',
  ) as HTMLDivElement;
  if (exist) {
    return exist;
  }
  const div = document.createElement('div');
  div.classList.add('edybara-overlay-container');
  document.body.appendChild(div);
  return div;
})();

export interface EdybaraOverlayProps {
  children: VNode<Attributes>;
}

export const EdybaraOverlay = ({ children }: EdybaraOverlayProps) => {
  return createPortal(children, overlayContainer);
};
