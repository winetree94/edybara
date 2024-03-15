import { createContext } from 'preact';
import { html } from '../../cdk';

const EdybaraScrollContext = createContext({});

export const EdybaraScrollRoot = () => {
  return html`
    <${EdybaraScrollContext.Provider} value=${{}}>
    </${EdybaraScrollContext.Provider}>
  `;
};

export const EdybaraScrollViewPort = () => {
  return html``;
};
