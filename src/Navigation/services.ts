import { Linking } from 'react-native';
import { appPrefix } from './index';

export const goToChat = (uniqueName: string | number, email: string) =>
  Linking.openURL(`${appPrefix}meetings/${uniqueName}?email=${email}`);

export const goToLogin = (uniqueName?: string | number, email?: string) =>
  Linking.openURL(`${appPrefix}/${uniqueName}?email=${email}`);
