const md = require('./index.js');

class CellStore {
  constructor() {}

  getCellValue(index) {
    const cellValues = {
      A1: 20,
      A2: 50,
      A3: 10,
    };

    const newIndex = new md.Index(index.row, index.col);
    return cellValues[newIndex.label];
  }
}

module.exports = { CellStore }