class BoardIdError extends Error {
  static errorName = "BoardIdError";
  constructor(message?: string) {
    super(message);
    this.name = BoardIdError.errorName;
  }
}

class ApiKeyError extends Error {
  static errorName = "ApiKeyError";
  constructor(message?: string) {
    super(message);
    this.name = ApiKeyError.errorName;
  }
}

export { BoardIdError, ApiKeyError };
