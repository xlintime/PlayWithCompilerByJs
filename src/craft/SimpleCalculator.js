const { TokenType } = require('./TokenType');
const { SimpleASTNode } = require('./SimpleASTNode');

class SimpleCalculator {
  constructor(nodeType, text) {
    this.parent = null;
    this.children = [];
    this.readonlyChildren = this.children.slice();
    this.nodeType = nodeType;
    this.text = text;
  }
  primary = tokens => {
    let node = null;
    let token = tokens.peek();
    if (token !== null) {
      if (token.type === TokenType.IntLiteral) {
        token = tokens.read();
        node = new SimpleASTNode(TokenType.IntLiteral, token.getText());
      } else if (token.type === TokenType.Identifier) {
        token = tokens.read();
        node = new SimpleASTNode(TokenType.Identifier, token.getText());
      } else if (token.type === TokenType.LeftParen) {
        // 没看懂
        tokens.read();
        // node = this.additive(tokens);
        if (node != null) {
          token = tokens.peek();
          if (token !== null && token.getType() === TokenType.RightParen) {
            tokens.read();
          } else {
            throw new Error('expecting right parenthesis');
          }
        } else {
          throw new Error('expecting an additive expression inside parenthesis');
        }
      }
    }
    return node
  };
}
