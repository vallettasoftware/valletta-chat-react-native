import { BaseError } from './baseError';

export class DefaultError extends BaseError {
  constructor(error?: Error) {
    super('Something went wrong', error?.name, error);
  }
}
