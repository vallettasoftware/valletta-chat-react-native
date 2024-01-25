import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/src/types';
import { SideMenuItem } from '../../../../common/menuItems';
import { styles } from './styles';
import { t } from '../../../../common/i18n';

type Props = {
  logout: () => void;
  sideMenuItems: SideMenuItem[];
  navigation: DrawerNavigationHelpers;
};

const MenuList: React.FC<Props> = ({ sideMenuItems, logout, navigation }: Props) => {
  const isDisabledButtons = [t('MAIN.MOBILE_SIDEBAR.MY_PROFILE'), t('MAIN.MOBILE_SIDEBAR.SETTINGS'), t('MAIN.MOBILE_SIDEBAR.CONTACT_US'), t('MAIN.MOBILE_SIDEBAR.SHARE_APP'), t('MAIN.MOBILE_SIDEBAR.RATE_APP'), t('MAIN.MOBILE_SIDEBAR.ABOUT_VALLETTA'), t('MAIN.MOBILE_SIDEBAR.INVITE_PEOPLE')];
  const getOnClick = (menuLabel: string) => {
    switch (menuLabel) {
      case 'Logout':
        return logout;
      default:
        // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
        return () => {};
    }
  };

  return (
    <View style={styles.menu}>
      {sideMenuItems.map(({ title, png, onPress }) => (
        <TouchableHighlight
          disabled={isDisabledButtons.includes(title)}
          key={title}
          style={styles.itemContainer}
          onPress={onPress ? () => onPress(navigation) : getOnClick(title)}
        >
          <View style={[styles.item, isDisabledButtons.includes(title) ? styles.disabled : styles.active]}>
            <Image source={png} style={styles.png} />
            <Text style={styles.text}>{title}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default MenuList;
