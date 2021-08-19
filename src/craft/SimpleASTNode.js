class SimpleASTNode {
  constructor(nodeType, text) {
    this.parent = null;
    this.children = [];
    this.readonlyChildren = this.children.slice();
    this.nodeType = nodeType;
    this.text = text;
  }

  getParent = () => {
    return this.parent;
  };
  getChildren = () => {
    return this.readonlyChildren;
  };
  getType = () => {
    return this.nodeType;
  };

  getText = () => {
    return this.text;
  };

  addChild(child) {
    this.children.push(child);
    this.parent = this;
  }
}
module.exports={
  SimpleASTNode:SimpleASTNode
}