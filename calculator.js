const dt = require("./value-evaluator.js");

const {
  isAnOperation,
  OperationHandler,
} = require("./operations/operations-handler.js");

const {
  isFunction,
  FunctionHandler,
} = require("./functions/function-handler.js");

class Calculator {
  constructor(formula) {
    this.formula = formula;
  }

  calculate() {
    const parsedExpression = this.formula;
    return this.evaluateFormula(parsedExpression);
  }

  evaluateFormula(parsedExpression) {
    // parse expression,
    if (!Array.isArray(parsedExpression)) {
      // can return a value error if their is a cyclic cell reference
      // ignore for now
      return new dt.ValueEvaluator(parsedExpression).evaluate();
    }

    if (
      Array.isArray(parsedExpression) &&
      this.expressionIsABaseCase(parsedExpression)
    ) {
      const firstParam = parsedExpression[0];
      const opsIsAOperator = isAnOperation(firstParam);

      if (opsIsAOperator) {
        // get value of left and right and evaluate
        const first = new dt.ValueEvaluator(parsedExpression[1]).evaluate();
        const second = new dt.ValueEvaluator(parsedExpression[2]).evaluate();
        const hander = new OperationHandler(firstParam, first, second);
        return hander.evaluate();
      }

      const opsIsAFunction = isFunction(firstParam);

      if (opsIsAFunction) {
        
        const handler = new FunctionHandler(
          firstParam,
          parsedExpression.slice(1)
        );

        return handler.evaluate();
      }
    }

    // TODO handle functions
    // get operations,
    const operation = parsedExpression[0];
    const first = this.evaluateFormula(parsedExpression[1]);
    const second = this.evaluateFormula(parsedExpression[2]);
    return this.solveExpression(operation, first, second);
  }

  solveExpression(ops, ...values) {
    // ops can be a function or operator
    const opsIsAOperator = isAnOperation(ops);

    if (opsIsAOperator) {
      const first = values[0];
      const second = values[1];
      return new OperationHandler(ops, first, second).evaluate();
    }

    const opsIsAFunction = isFunction(ops);
    if (opsIsAFunction) {
      return new FunctionHandler(ops, values).evaluate();
    }

    throw new error.OperationError(
      ops + " is not a supported operation or function"
    );
  }

  isOperationBaseCase(expression) {
    if (expression.length === 3) {
      if (!Array.isArray(expression[1]) && !Array.isArray(expression[2])) {
        return true;
      }
    }
    return false;
  }

  expressionIsABaseCase(expression) {
    const firstParam = expression[0];

    if (isAnOperation(firstParam) && this.isOperationBaseCase(expression)) {
      return true;
    }
    // TODO check for functions
    return false;
  }
}

module.exports = { Calculator };
