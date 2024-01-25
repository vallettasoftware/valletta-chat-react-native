import React, { useEffect, FC, ComponentClass } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/core';
import { goToLogin } from '../Navigation/services';
import { useUser } from './useUser';

export type NavProps = {
  navigation: NavigationProp<any>;
  route?: RouteProp<any, any>;
};

type CheckAuthHoc = (component: FC<NavProps> | ComponentClass<NavProps>) => FC<NavProps>;

export const checkAuth: CheckAuthHoc = (Component) => (props: NavProps) => {
  const { user, ready } = useUser();
  const { route } = props;

  useEffect(() => {
    if (!user.email && ready) {
      goToLogin(route?.params?.uniqueName, route?.params?.email);
    }
  }, [user.email, ready]);

  if (!user.email) return null;

  return <Component {...props} />;
};
