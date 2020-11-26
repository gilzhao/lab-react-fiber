class Node {
  constructor(instance) {
      this.instance = instance;
      this.child = null;
      this.sibling = null;
      this.return = null;
  }
}

function link(parent, elements) {
  if (elements === null) elements = [];

  parent.child = elements.reduceRight((previous, current) => {
      const node = new Node(current);
      node.return = parent;
      node.sibling = previous;
      return node;
  }, null);

  return parent.child;
}
