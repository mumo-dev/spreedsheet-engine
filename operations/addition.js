const { isDate } = require("./../helper.js");
const error = require('./../errors.js')

class Addition {
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  calculate() {
    // check  data types
    if (!isNaN(this.first) && !isNaN(this.second)) {
      // both are numbers
      return Number(this.first) + Number(this.second);
    }

    // check if one is date time;
    if (isDate(this.first) && !isNaN(this.second)) {
      // one is date
      return this.addDaysToDate(this.first, Number(this.second));
    }

    if (!isNaN(this.first) && isDate(this.second)) {
      // one is date
      return this.addDaysToDate(this.first, Number(this.second));
    }

    // operation cannot be performed;
    throw new error.OperationError(
      " + operator not supported for the data types supplied"
    );
  }

  addDaysToDate(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

module.exports = { Addition };
