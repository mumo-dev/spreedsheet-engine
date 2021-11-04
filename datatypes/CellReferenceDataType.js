
const md = require("./../index.js");
const store = require("./../spreadsheet-store.js");

class CellReferenceDataType {
    constructor(value) {
      this.value = value;
    }
  
    get isOfType() {
      try {
        md.Index.parse(this.value);
        return true;
      } catch (err) {
        return false;
      }
    }
  
    getValue() {
      if (this.isOfType) {
        const index = md.Index.parse(this.value);
        const cellStore = new store.CellStore();
        return cellStore.getCellValue(index);
      }
      return null;
    }
  }
  
  module.exports = { CellReferenceDataType};