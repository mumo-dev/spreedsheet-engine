
class NumberDataType {
    constructor(value) {
      this.value = value;
    }
  
    get isOfType() {
      return !isNaN(this.value);
    }
  
    getValue() {
      if (this.isOfType) {
        return this.value;
      }
      return null;
    }
  }

  module.exports = { NumberDataType}