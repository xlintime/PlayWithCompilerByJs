const { DfaState } = require('./DfaState');
const { TokenType } = require('./TokenType');
class SimpleLexer {
  constructor(tokenText, tokens, token) {
    this.tokenText = '';
    this.tokens = [];
    this.token = null;
  }

  // 判断字符
  isAlpha(char) {
    const reg = new RegExp(/^[a-zA-Z_]([a-zA-Z_] | [0-9])*/);
    const result = reg.test(char);
    return result;
  }

  // 判断数字
  isDigit(char) {
    const reg = new RegExp("[0-9]+");
    const result = reg.test(char);
    return result;
  }

  // 判断空格
  isBlank(char) {
    return char === ' ' || char === '\t' || char === '\n' || char === '\r';
  }

  calToken(char) {
    // console.log('this.tokenText-->', this.tokenText);
    // console.log('this.char-->', char);
    console.log('tcalToken-->', 111111, char);
    if (this.tokenText.length > 0) {
      this.token.text = this.tokenText;
      this.tokens.push(this.token);

      this.tokenText = '';
      this.token = new SimpleToken();
    }

    let newState = DfaState.Initial;
    if (this.isAlpha(char)) {
      this.token.type = TokenType.Identifier;
      this.tokenText += char;
      newState = DfaState.Id;
    } else if (this.isDigit(char)) {
      newState = DfaState.IntLiteral;
      this.token.type = TokenType.IntLiteral;
      this.tokenText += char;
    } else if (char === '=') {
      newState = DfaState.Assignment;
      this.token.type = TokenType.Assignment;
      this.tokenText += char;
    } else if (char === ';') {
      newState = DfaState.SemiColon;
      this.token.type = TokenType.SemiColon;
      this.tokenText += char;
    } else {
      newState = DfaState.Initial; // skip all unknown patterns
    }

    return newState;
  }

  /**
   *
   * @param {* 表达式} script
   */
  tokenize(script) {
    this.tokens = [];
    this.tokenText = '';
    this.token = new SimpleToken();
    let state = DfaState.Initial; // 初始状态机的状态为 initial
    const scriptList = script.split('');
    let index;
    for (index = 0; index < scriptList.length; index++) {
      console.log('index-->', index);
      const char = scriptList[index];
      debugger;
      switch (state) {
        case DfaState.Initial:
          state = this.calToken(char);
          break;
        case DfaState.Id:
          if (this.isAlpha(char) || this.isDigit(char)) {
            this.tokenText += char;
          } else {
            state = this.calToken(char);
          }
          break;
        case DfaState.GT:
          if (char === '=') {
            this.token.type = TokenType.GE;
            state = DfaState.GE;
            this.tokenText += char;
          } else {
            state = this.calToken(char);
          }
          break;
        case DfaState.GE:
        case DfaState.SemiColon:
        case DfaState.Assignment:
        case DfaState.Star:
        case DfaState.Minus:
        case DfaState.Slash:
        case DfaState.LeftParen:
        case DfaState.RightParen:
          state = this.calToken(char);
          break;
        case DfaState.IntLiteral:
          if (this.isDigit(char)) {
            this.tokenText += char;
          } else {
            state = this.calToken(char);
          }
          break;
        default:
      }
    }
    if (this.tokenText.length > 0) {
      const char = scriptList[index];
      this.calToken(char);
    }
    console.log('999999');
    console.log('tokens-->', this.tokens);
    return this.tokens;
  }
}

class SimpleToken {
  constructor(type, text) {
    this.type = null;
    this.text = null;
  }

  getType() {
    return this.type;
  }

  getText() {
    return this.text;
  }
}

const script = 'age = 45;';
console.log('111');
const lexer = new SimpleLexer();
console.log('222');
lexer.tokenize(script);
