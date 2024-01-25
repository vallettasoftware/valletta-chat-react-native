import { PathConfig } from '@react-navigation/core';

type MainRouteKeys = 'Main' | 'Chat' | 'ResetPassword';

type SubstackScreens = {
  [routeName in MainRouteKeys]: PathConfig | string;
};

const substackScreens: SubstackScreens = {
  Main: {
    path: '/meetings',
  },
  Chat: {
    path: `/meetings/:uniqueName`,
    parse: {
      uniqueName: (value) => Number(value),
      email: String,
    },
  },
  ResetPassword: '/auth/reset-password',
};

interface SubStackConfig extends PathConfig {
  screens: SubstackScreens;
}

interface ContainerConfig extends PathConfig {
  screens: {
    SubStack: SubStackConfig;
  };
}

export interface MainConfig extends PathConfig {
  screens: {
    Container: ContainerConfig;
  };
}

export const mainConfig: MainConfig = {
  screens: {
    Container: {
      screens: {
        SubStack: {
          screens: substackScreens,
        },
      },
    },
  },
};
