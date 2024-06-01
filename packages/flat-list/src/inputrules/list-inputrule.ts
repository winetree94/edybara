import { Attrs, NodeType } from '@edybara/pm/model';
import { canJoin, findWrapping } from '@edybara/pm/transform';
import { InputRule } from '@edybara/pm/inputrules';

export function wrappingFlatListInputRule(
  regexp: RegExp,
  nodeType: NodeType,
  getAttrs: Attrs | null | ((matches: RegExpMatchArray) => Attrs | null) = null,
) {
  return new InputRule(regexp, (state, match, start, end) => {
    const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    const tr = state.tr.delete(start, end);
    let $start = tr.doc.resolve(start);
    let range = $start.blockRange();

    if (!range) {
      return null;
    }

    const validTransform = state.schema.nodes['paragraph'].validContent(
      range.$from.parent.content,
    );

    if (!validTransform) {
      return null;
    }

    const originAlign = range.$from.parent.attrs?.['align'];

    tr.setNodeMarkup(range.start, state.schema.nodes['paragraph'], {
      ...range.$from.parent.attrs,
      indent: 0,
    });

    $start = tr.doc.resolve(start);
    range = $start.blockRange()!;

    const wrapping = range && findWrapping(range, nodeType, attrs);

    if (!wrapping) {
      return null;
    }

    wrapping[wrapping.length - 1].attrs = {
      ...attrs,
      align: originAlign || undefined,
    };

    tr.wrap(range, wrapping);
    const before = tr.doc.resolve(start - 1).nodeBefore;

    if (before && before.type == nodeType && canJoin(tr.doc, start - 1)) {
      tr.join(start - 1);
    }

    return tr;
  });
}
