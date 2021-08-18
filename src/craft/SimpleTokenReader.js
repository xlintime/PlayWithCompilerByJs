class SimpleeTokenReader {
  constructor(tokens) {
    this.pos = 0;
    this.tokens = tokens;
  }

  peek() {
    // 获取当前的，但不会向前进一位
    if (this.pos < this.tokens.length) {
      const item = this.tokens[this.pos];
      return item;
    }
    return null;
  }

  read() {
    // 获取当前的，并向前进一位
    if (this.pos < this.tokens.length) {
      const item = this.tokens[this.pos++];
      return item;
    }
    return null;
  }
  unRead() {
    if (this.pos > 0) {
      this.pos--;
    }
  }
  getPosition() {
    return this.pos;
  }

  setPosition(position) {
    this.pos = position;
  }
}
