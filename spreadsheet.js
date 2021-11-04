
 const calc = require('./calculator.js');


const testValues = {
  A1: "A1",
  "2018-01-01": "2018-01-01",
  "6.02e23": "6.02e23",
  miscellaneousliteral: "miscellaneousliteral",
  "string with spaces": "string with spaces",
  "A1 + A2": ["+", "A1", "A2"],
  "-1 + 2": ["+", "-1", "2"],
  "2 + -1": ["+", "2", "-1"],
  "A1 - A2 - A3": ["-", ["-", "A1", "A2"], "A3"],
  "A1 + (A2 - A3)": ["+", "A1", ["-", "A2", "A3"]],
  "A1 + A2 * A3": ["+", "A1", ["*", "A2", "A3"]],
  "sum(A1:A2)": ["sum", "A1:A2"],
  "sum(A1:A2, A3, A4)": ["sum", "A1:A2", "A3", "A4"],
  "sqrt((1+1))": ["sqrt", ["+", "1", "1"]],
  "A1 + sqrt(A2 + A3)": ["+", "A1", ["sqrt", ["+", "A2", "A3"]]],
};

// A1 = 20, A2=50, A3=10
const calculator = new calc.Calculator(testValues['A1 + A2 * A3']);
const fn = calculator.calculate();
console.log(fn);


function set(index, raw) {
  // validations - check for cyclic dependency
  // create cell data object
    // calculator ->
    // handle errors if any
  // store in memory
}

// get