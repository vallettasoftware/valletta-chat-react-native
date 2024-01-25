export class BaseError extends Error {
  public innerException?: Error;

  constructor(msg?: string, name?: string, err?: Error) {
    super(msg);

    if (name) {
      this.name = name;
    }

    if (err) {
      this.innerException = err;

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, BaseError);
      } else {
        this.stack = err.stack;
      }
    }
  }
}
