const { isDate } = require("./../helper");

class DateTimeDataType {
  constructor(value) {
    this.value = value;
  }

  get isOfType() {
    return isDate(this.value);
  }

  getValue() {
    if (this.isOfType) {
      return this.value;
    }
    return null;
  }
}

module.exports = { DateTimeDataType };
