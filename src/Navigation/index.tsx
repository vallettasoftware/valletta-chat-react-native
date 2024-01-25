import { LinkingOptions, PathConfigMap } from '@react-navigation/native';
import { authConfig, AuthConfig } from './Auth';
import { mainConfig, MainConfig } from './Main';

export const appPrefix = 'sharpdev.twilio://';

type AppPathConfigMap = {
  Auth: AuthConfig;
  Main: MainConfig;
};

interface AppLinkingOptions extends LinkingOptions {
  config?: { initialRouteName?: string; screens: AppPathConfigMap };
}

export const linkingOptions: AppLinkingOptions = {
  prefixes: ['https://*.stage.sharp-dev.net', appPrefix],
  config: {
    screens: {
      Main: mainConfig,
      Auth: authConfig,
    },
  },
};

export type AuthRoutes = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ForgotPasswordDone: {
    email: string;
  };
  ChangePassword: undefined;
};

type ChatParams = {
  uniqueName: number;
  email?: string;
  channelUniqueName: string;
};

export type MainRoutes = {
  Main: undefined;
  Chat: ChatParams;
  ResetPassword: undefined;
};
