import { ImageSourcePropType } from 'react-native';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { t } from './i18n';
import SharpTalksModal from '../features/Chat/components/modalOption';
import { ActionOption } from '../features/Chat/enums/actionOption';
import { modalTexts } from './../store/models/common/Modal';

export type SideMenuItem = {
  png: ImageSourcePropType;
  title: string;
  onPress?: (params: DrawerNavigationHelpers) => void;
};

export const mainScreenSideMenuItems: SideMenuItem[] = [
  {
    png: require('../assets/icons/SideMenu/My_profile.png'),
    title: t('MAIN.MOBILE_SIDEBAR.MY_PROFILE'),
  },
  {
    png: require('../assets/icons/SideMenu/My_profile.png'),
    title: t('MAIN.HEADER.CHANGE_PASSWORD'),
    onPress: (navigation) => {
      navigation.navigate('ResetPassword');
    },
  },
  {
    png: require('../assets/icons/SideMenu/Settings.png'),
    title: t('MAIN.MOBILE_SIDEBAR.SETTINGS'),
  },
  {
    png: require('../assets/icons/SideMenu/Contact_us.png'),
    title: t('MAIN.MOBILE_SIDEBAR.CONTACT_US'),
  },
  {
    png: require('../assets/icons/SideMenu/Share_app.png'),
    title: t('MAIN.MOBILE_SIDEBAR.SHARE_APP'),
  },
  {
    png: require('../assets/icons/SideMenu/Rate_app.png'),
    title: t('MAIN.MOBILE_SIDEBAR.RATE_APP'),
  },
  {
    png: require('../assets/icons/SideMenu/About.png'),
    title: t('MAIN.MOBILE_SIDEBAR.ABOUT_VALLETTA'),
  },

  {
    png: require('../assets/icons/SideMenu/Logout.png'),
    title: t('MAIN.MOBILE_SIDEBAR.LOGOUT'),
  },
];

export const conferenceScreenSideMenuItems: SideMenuItem[] = [
  {
    png: require('../assets/icons/SideMenu/About_meeting.png'),
    title: t('MAIN.MOBILE_SIDEBAR.ABOUT_MEETING'),
    onPress: () => {
      SharpTalksModal.show({
        action: ActionOption.MEETING_INFO,
        modal: modalTexts.meetingInfo,
        withArguments: false,
        defaultButtonTitle: t('MAIN.ACTIVE_MEETING.INFO.BUTTON'),
        swapButtons: true
      })
    }
  },
  {
    png: require('../assets/icons/SideMenu/Invite_people.png'),
    title: t('MAIN.MOBILE_SIDEBAR.INVITE_PEOPLE'),
  },
].concat(mainScreenSideMenuItems);
