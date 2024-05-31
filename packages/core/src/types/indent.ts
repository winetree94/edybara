import { NodeSpec } from '@edybara/pm/model';

export interface IndentableAttrs {
  indent: number;
}

export interface IndentableNodeSpec extends NodeSpec {
  attrs: {
    indent: {
      default: number;
    };
  };
  meta: {
    maxIndent: null | number;
  };
}
