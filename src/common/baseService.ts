import { AxiosError } from 'axios';

import { BaseError } from './errors/baseError';
import { TwilioMoneyError } from './errors/twilioMoneyError';
import { DefaultError } from './errors/defualtError';

export class BaseService {
  private static readonly outOfMoneyError = {
    code: 500,
    email: null,
    message: 'Authenticate',
  };

  private static isTwilioError = (data: any) => {
    if (!data) {
      return false;
    }
    
    if (Array.isArray(data.errors)) {
      const twilioError = data.errors[0];
      return (
        twilioError.code === BaseService.outOfMoneyError.code &&
        twilioError.email === BaseService.outOfMoneyError.email &&
        twilioError.message === BaseService.outOfMoneyError.message
      );
    }

    return false;
  };

  private static notFound = (data: any) => {
    if (!data) {
      return false;
    }

    if (Array.isArray(data.errors)) {
      const notFoundError = data.errors[0];
      return notFoundError.code === 404;
    }
  }

  public static chooseError = (error?: Error): BaseError => {
    if (!error) {
      return new DefaultError();
    }

    const axiosError = error as AxiosError;

    if (!axiosError || !axiosError.response) {
      return new DefaultError(error);
    }    
    
    if (BaseService.isTwilioError(axiosError.response.data)) {
      return new TwilioMoneyError(axiosError);
    }

    if (BaseService.notFound(axiosError.response.data)) {
      return new BaseError(axiosError.response.data.errors[0].message);
    }

    return new DefaultError(error);
  };
}
