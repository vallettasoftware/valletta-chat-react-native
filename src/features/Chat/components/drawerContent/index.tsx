import React from 'react';
import { View, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { RootState } from '../../../../store';
import MenuList from '../menuList';
import SideMenuHeader from '../sideMenuHeader';
import MessagesChat from '../textChat/messagesChat';
import { ParticipantsMenu } from '../participantsMenu';
import { conferenceScreenSideMenuItems, mainScreenSideMenuItems } from '../../../../common/menuItems';
import { t } from '../../../../common/i18n';
import { useUser } from '../../../../common/useUser';
import { styles } from './styles';
import moment from 'moment';

const DrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const { logout } = useUser();
  const { menuComponent } = useSelector((state: RootState) => state.main);
  const { navigate, closeDrawer } = navigation;
  const year = moment().format('YYYY');

  const handleLogout = async () => {
    logout().then(() => navigate('Auth'));
  };

  const getComponent = () => {
    switch (menuComponent.name) {
      case 'Settings':
        return (
          <>
            <SideMenuHeader justLogo closeMenu={() => closeDrawer()} />
            <MenuList navigation={navigation} sideMenuItems={mainScreenSideMenuItems} logout={handleLogout} />
            <Text style={styles.footer}>Sharp Dev © 2008 — {year}.</Text>
          </>
        );
      case 'ConferenceSettings': {
        return (
          <>
            <SideMenuHeader justLogo closeMenu={() => closeDrawer()} />
            <MenuList navigation={navigation} sideMenuItems={conferenceScreenSideMenuItems} logout={handleLogout} />
            <Text style={styles.footer}>Sharp Dev © 2008 — {year}.</Text>
          </>
        );
      }
      case 'Participants':
        return (
          <>
            <SideMenuHeader
              title={t('MAIN.ACTIVE_MEETING.RIGHT_CONTROLS.PARTICIPANTS')}
              countOfParticipants={menuComponent.participants.length}
              uniqueName={menuComponent.uniqueName}
              closeMenu={() => closeDrawer()}
            />
            <ParticipantsMenu menuParticipants={menuComponent.participants} />
          </>
        );
      case 'Messages':
        return (
          <>
            <SideMenuHeader title={t('MAIN.ACTIVE_MEETING.RIGHT_CONTROLS.MESSAGES')} closeMenu={() => closeDrawer()} />
            <MessagesChat />
          </>
        );
      default:
        return (
          <>
            <SideMenuHeader justLogo closeMenu={() => closeDrawer()} />
            <MenuList
              navigation={navigation}
              sideMenuItems={mainScreenSideMenuItems}
              logout={() => navigate('Login')}
            />
            <Text style={styles.footer}>Sharp Dev © 2008 — {year}.</Text>
          </>
        );
    }
  };
  return <View style={styles.flex}>{getComponent()}</View>;
};

export default DrawerContent;
