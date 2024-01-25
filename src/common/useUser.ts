import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import { AppSecureStorage, storageKeys } from './AppSecureStorage';
import { removeUserInfo, setAuthToken, setRefreshToken, setUserEmail } from '../store/User';
import AuthService from '../features/Auth/services/AuthService';
import { goToLogin } from '../Navigation/services';
import { errorCodes } from './errorCodes';
import { ErrorHandler } from './ErrorHandler';

const successRes = 'Success';
const failRes = 'Failed';

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [ready, setReady] = useState(false);

  const initialize = async () => {
    const [email, refreshToken, token] = await AppSecureStorage.getAll();
    if (token) dispatch(setAuthToken(token));
    if (refreshToken) dispatch(setRefreshToken(refreshToken));
    if (email) dispatch(setUserEmail(email));
  };

  const waitUntilReady = async () => {
    if (!(user.email && user.token)) {
      await initialize();
    }
    if (!ready) setReady(true);
    return Promise.resolve();
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await AuthService.SigninWithEmail(email, password);
      dispatch(setAuthToken(data.token));
      dispatch(setUserEmail(data.user.email));
      dispatch(setRefreshToken(data.refreshToken));
      await AppSecureStorage.set(storageKeys.EMAIL, data.user.email);
      await AppSecureStorage.set(storageKeys.TOKEN, data.token);
      await AppSecureStorage.set(storageKeys.REFRESH_TOKEN, data.refreshToken);
    } catch (e) {
      ErrorHandler.handleNetworkError();
      throw e;
    }
  };

  const logout = () => {
    dispatch(removeUserInfo());
    return AppSecureStorage.clearStorage();
  };

  const refreshUser: () => Promise<string> = async () => {
    try {
      await waitUntilReady();
      if (user.refreshToken && user.email) {
        const token = await AuthService.GetBearerToken(user.refreshToken, user.email);
        dispatch(setAuthToken(token));
        await AppSecureStorage.set(storageKeys.TOKEN, token);
        return successRes;
      }
      await goToLogin();
    } catch (e) {
      if ((e as AxiosError)?.response?.data?.errorCode === errorCodes.ERR_INVALID_TOKEN) {
        await logout();
        await goToLogin();
      } else {
        ErrorHandler.handleNetworkError();
      }
      return failRes;
    }
    return failRes;
  };

  type CallWithRefresh = (cb: (params: unknown) => Promise<unknown>, ...params: Array<unknown>) => Promise<unknown>;

  const callWithRefresh: CallWithRefresh = async (callback, params) => {
    let res;
    try {
      res = await callback(params);
    } catch (e) {
      if ((e as AxiosError).response?.status === 401) {
        const refreshRes = await refreshUser();
        if (refreshRes === successRes) {
          res = await callback(params);
        }
      }
    }
    return res;
  };

  useEffect(() => {
    waitUntilReady();
  }, []);

  return { ready, user, login, logout, callWithRefresh };
};
