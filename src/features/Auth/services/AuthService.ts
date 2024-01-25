import { AxiosResponse } from 'axios';
import axios from '../../../../axios.config';
import { LoginResponse } from '../../../store/models/responses/Login';
import { ChangePasswordPayload, ChangePasswordResponse } from './types';

class AuthService {
  public GetBearerToken: (refreshToken: string, email: string) => Promise<string> = async (
    refreshToken,
    email,
  ) => {
    const res = await axios.post(`${this.prefix}/refresh-token`, { refreshToken, email });
    return res.data;
  };

  public SigninWithEmail = async (email: string, password: string) => {
    let response: AxiosResponse<LoginResponse>;
    try {
      response = await axios.post(`${this.prefix}/login`, {
        email,
        password,
      });
    } catch (err) {
      const { data } = err.response;
      throw new Error(data.code.toString());
    }
    return response;
  };

  public SignupWithEmail = async (name: string, email: string, password: string) => {
    try {
      const { data } = await axios.post(`${this.prefix}/register`, {
        name,
        email,
        password,
      });
      return data;
    } catch (err) {
      const { data } = err.response;
      throw new Error(data.code);
    }
  };

  public SendConfirmEmail = async (email: string) => {
    try {
      const { data } = await axios.post(`${this.prefix}/send-confirm-email`, { email });
      return data;
    } catch (err) {
      return err.message;
    }
  };

  public ForgotPassword = async (email: string) => {
    try {
      const res = await axios.post(`${this.prefix}/forgot-password`, { email });
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  public async ChangePassword(data: ChangePasswordPayload): Promise<ChangePasswordResponse> {
    const res = await axios.post(`${this.prefix}/change-password`, data);
    return res.data;
  }

  private prefix = 'api/Auth';
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
