
const {Summation} = require('./sum.js')

const isFunction = (functionName) => {
    const functions = ["sum", "sqrt"];
    return functions.indexOf(functionName) !== -1;
}


class FunctionHandler {

    constructor(functionName, ...values) {
      this.functionName = functionName;
      this.values = values;
    }
  
    evaluate() {
      switch (this.functionName) {
        case "sum":
          return new Summation(this.values).calculate();
      }
    }
  }

  module.exports = { FunctionHandler, isFunction };