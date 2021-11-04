
const error = require('./../errors.js')

class Division {
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  calculate() {
    // check  data types
    if (!isNaN(this.first) && !isNaN(this.second)) {
      // both are numbers
      return Number(this.first) / Number(this.second);
    }
    // operation cannot be performed;
    throw new error.OperationError(
      " / operator not supported for the data types supplied"
    );
  }
}
