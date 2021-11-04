
const { CellReferenceDataType} = require('./datatypes/CellReferenceDataType.js');
const { StringDataType} = require('./datatypes/StringDataType.js');
const { NumberDataType} = require('./datatypes/NumberDataType.js');
const { DateTimeDataType} = require('./datatypes/DatetimeDataType.js');


class EvaluationOrder {
  constructor(dataType, order) {
    this.dataType = dataType;
    this.order = order;
  }
}

class ValueEvaluator {
  dataTypeEvaluationOrders = [];

  constructor(value) {
    this.value = value;
    // lower orders all evaluated first
    this.addDataType(new CellReferenceDataType(value), 0);
    this.addDataType(new DateTimeDataType(value), 1);
    this.addDataType(new NumberDataType(value), 2);
    this.addDataType(new StringDataType(value), 3);
  }

  evaluate() {
    for (let evaluationOrder of this.dataTypeEvaluationOrders) {
      // get datatye
      const dataType = evaluationOrder.dataType;
      // every data type has a method called isOfType and value;;
      // if isOfType then return value;
      if (dataType.isOfType) {
        return dataType.getValue();
      }
    }
    throw Error("value: " + this.value + " could not be evaluated");
  }

  addDataType(dataType, order) {
    this.dataTypeEvaluationOrders.splice(
      order,   0,  new EvaluationOrder(dataType, order)
    );
  }
}

module.exports = { ValueEvaluator, DateTimeDataType };
