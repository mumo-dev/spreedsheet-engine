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
      const opsIsAFunction = isFunction(firstParam);

      if (opsIsAOperator) {
        // get value of left and right and evaluate
        const first = new dt.ValueEvaluator(parsedExpression[1]).evaluate();
        const second = new dt.ValueEvaluator(parsedExpression[2]).evaluate();
        return this.solveOperationExpression(firstParam, first, second);
      } else if (opsIsAFunction) {
        return this.solveFunctionExpression(
          firstParam,
          parsedExpression.slice(1)
        );
      }
    }

    // TODO handle functions
    // get operations,
    const firstParam = parsedExpression[0];
    const opsIsAOperator = isAnOperation(firstParam);
    const opsIsAFunction = isFunction(firstParam);

    if (opsIsAOperator) {
      const first = this.evaluateFormula(parsedExpression[1]);
      const second = this.evaluateFormula(parsedExpression[2]);
      return this.solveOperationExpression(firstParam, first, second);
    } else if (opsIsAFunction) {
      // get all params from index 1, call evaluate formula on the and store result
      const paramValues = [];
      for (let value of parsedExpression.slice(1)) {
        const evaluationResult = this.evaluateFormula(value);
        paramValues.push(evaluationResult);
      }
      return this.solveFunctionExpression(firstParam, ...paramValues);
    } else {
      throw new error.OperationError(
        ops + " is not a supported operation or function"
      );
    }
  }

  solveFunctionExpression(functionName, ...values) {
    const handler = new FunctionHandler(functionName, values);
    return handler.evaluate();
  }

  solveOperationExpression(ops, first, second) {
    return new OperationHandler(ops, first, second).evaluate();
  }

  solveExpression(ops, ...values) {
    // ops can be a function or operator
    const opsIsAOperator = isAnOperation(ops);

    if (opsIsAOperator) {
      const first = values[0];
      const second = values[1];
      return this.solveExpression(ops, first, second);
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

  isAFunctionBaseCase(expression) {
    for (let value of expression.slice(1)) {
      if (Array.isArray(value)) {
        return false;
      }
    }
    return true;
  }

  expressionIsABaseCase(expression) {
    const firstParam = expression[0];

    if (isAnOperation(firstParam)) {
      return this.isOperationBaseCase(expression);
    } else if (isFunction(firstParam)) {
      return this.isAFunctionBaseCase(expression);
    } else {
      throw new error.OperationError(
        ops + " is not a supported operation or function"
      );
    }
  }
}

module.exports = { Calculator };
