class Flash {
  // constructor function

  static _messages = null;
  // we use underscore because it is a convention and indicates it should be private

  static setMessage(type, message) {
    this._messages = this._messages || {};
    this._messages[type] = message;
  }

  static getMessages() {
    return this._messages;
  }

  static clearMessages() {
    this._messages = null;
  }

}

export default Flash;
