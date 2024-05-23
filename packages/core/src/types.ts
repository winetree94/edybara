import { Node } from '@edybara/pm/model';

export interface NodePair {
  node: Node;
  pos: number;
  parent: Node | null;
}
