import { Node } from 'prosemirror-model';
import { EdybaraFlatTaskListItemAttrs } from '../schemas';

export const createNode = (node: Node) => {
  const attrs = node.attrs as EdybaraFlatTaskListItemAttrs;
  const classes = ['edybara-task-list-item'];
  if (attrs.align && attrs.align !== 'left') {
    classes.push(`edybara-align-${attrs.align}`);
  }
  classes.push(`edybara-indent-${attrs.indent || 1}`);
  if (attrs.checked) {
    classes.push('edybara-task-list-item-checked');
  }

  const li = document.createElement('li');
  li.classList.add(...classes);
  li.dataset['textAlign'] = attrs.align || 'left';
  li.dataset['indent'] = `${attrs.indent || 1}`;
  li.dataset['checked'] = attrs.checked ? 'true' : 'false';
  return li;
}