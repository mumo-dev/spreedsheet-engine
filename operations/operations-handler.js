const error = require("./../errors.js");
const { Addition } = require("./addition");
const { Subtraction } = require("./subtraction");
const { Multiplication } = require("./multiplication");
const { Division } = require("./division");

class OperationHandler {
  constructor(ops, first, second) {
    this.ops = ops;
    this.first = first;
    this.second = second;
  }

  evaluate() {
    switch (this.ops) {
      case "+":
        return new Addition(this.first, this.second).calculate();
      case "-":
        return new Subtraction(this.first, this.second).calculate();
      case "*":
        return new Multiplication(this.first, this.second).calculate();
      case "/":
        return new Division(this.left, this.right).calculate();
      default:
        throw new error.OperationError(
          this.ops + "  operator not supported for the data types supplied"
        );
    }
  }
}

const isAnOperation = (op) => {
  const operations = ["+", "-", "*", "/"];
  return operations.indexOf(op) !== -1;
};

module.exports = { OperationHandler, isAnOperation };