import { PathConfig } from '@react-navigation/core';

type AuthStackRouteKeys = 'Login' | 'Signup' | 'ForgotPassword';

type AuthPathConfigMap = {
  [routeName in AuthStackRouteKeys]: PathConfig;
};

export interface AuthConfig extends PathConfig {
  screens: AuthPathConfigMap;
}

export const authConfig: AuthConfig = {
  screens: {
    ForgotPassword: {
      exact: true,
      path: '/restore-password',
    },
    Signup: {
      path: '/auth/sign-up',
    },
    Login: {
      path: `/:uniqueName`,
      parse: {
        email: String,
        uniqueName: (value) => +value,
      },
    },
  },
};
