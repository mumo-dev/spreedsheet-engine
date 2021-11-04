class Index {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  static parse(label) {
    const cellIndexes = {
      A1: new Index(0, 0),
      A2: new Index(0, 1),
      A3: new Index(0, 2),
    };

    const allLabels = ["A1", "A2", "A3"];
   
    if (allLabels.indexOf(label) == -1) {
      throw new ValueError(label + " not not a valid label");
    }
    
    return cellIndexes[label];
  }


  get label() {
      if(this.row === 0 && this.col == 0) return 'A1';
      if(this.row === 0 && this.col == 1) return 'A2';
      if(this.row === 0 && this.col == 2) return 'A3';

      throw new ValueError("Invalid index");
  }
}

class ValueError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = { Index, ValueError };