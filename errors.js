class OperationError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = { OperationError };
