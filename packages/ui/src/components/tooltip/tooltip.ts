import { html } from '../../cdk';
import { useEffect } from 'preact/hooks';

export interface EdybaraTooltipProps {
  id: string;
}

export const EdybaraTooltip = (props: EdybaraTooltipProps) => {
  useEffect(() => {
    const dom = document.getElementById(props.id);
  }, []);
  return html``;
};
