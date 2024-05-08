import { EditorState } from '@edybara/pm/state';
import { EdybaraHeadingAttrs } from '@edybara/heading';

export const getTextType = (state: EditorState) => {
  const { selection } = state;
  const { $from, $to } = selection;

  if (
    $from.parent === $to.parent &&
    $from.parent.type === state.schema.nodes['heading']
  ) {
    const attrs = $from.parent.attrs as EdybaraHeadingAttrs;
    return `h${attrs.level}`;
  }

  return 'p';
};
