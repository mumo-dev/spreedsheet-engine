class StringDataType {
  constructor(value) {
    this.value = value;
  }

  get isOfType() {
    const type = typeof this.value;
    return type === "string";
  }

  getValue() {
    if (this.isOfType) {
      return this.value;
    }
    return null;
  }
}

module.exports = { StringDataType }