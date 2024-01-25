import { BaseError } from './baseError';

export class TwilioMoneyError extends BaseError {
  constructor(error?: Error) {
    super('Not enough money', 'Twilio Account', error);
  }
}
