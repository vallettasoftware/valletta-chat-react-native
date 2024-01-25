import { ErrorCode } from '../../../common/errorCodes';

export type RefreshError = {
  code: number;
  message: string;
  errorCode: ErrorCode;
  email: string | null;
};
