import { ErrorCode } from '../../../common/errorCodes';

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  email: string;
};

export type ChangePasswordResponse = {
  errorCode: ErrorCode;
  message: string;
  code: number;
};
