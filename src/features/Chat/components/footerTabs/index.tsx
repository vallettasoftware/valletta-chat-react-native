import React from 'react';
// @ts-ignore
import { Footer, FooterTab } from 'native-base';
import { useSelector } from 'react-redux';
import VerticalButton from '../verticalButton';
import store, { RootState } from '../../../../store';
import { toggleUnread } from '../../../../store/conference/messages';
import { IMenuComponent } from '../../../../store/models/common/Menu';
import { IParticipantConfig } from '../../../../store/models/common/Participants';
import { t } from '../../../../common/i18n';
import { styles } from './styles';

interface IFooterTabsProps {
  id: number;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  onPress: () => void;
  changeMicroState: () => void;
  changeVideoState: () => void;
  openMenu: (menuComponent: IMenuComponent) => void;
  participants: Map<string, IParticipantConfig>;
}

export const FooterTabs = (props: IFooterTabsProps) => {
  const {
    id,
    isAudioEnabled,
    isVideoEnabled,
    onPress,
    changeMicroState,
    changeVideoState,
    openMenu,
    participants,
  } = props;
  const { isUnreadMessages } = useSelector((state: RootState) => state.conferenceMessages);
  const menuParticipants = Array.from(participants, ([sid, participantsConfig]) => ({
    name: participantsConfig.name,
    isAudioEnabled: participantsConfig.isAudioEnabled,
  }));

  return (
    <Footer style={styles.footerTabsContainer}>
      <FooterTab style={styles.footerTabs}>
        <VerticalButton
          title={{
            enable: t('MAIN.ACTIVE_MEETING.BOTTOM_CONTROLS.MUTE'),
            disable: t('MAIN.ACTIVE_MEETING.BOTTOM_CONTROLS.UNMUTE'),
          }}
          icon="Mic"
          onPress={changeMicroState}
          enable={isAudioEnabled}
        />
        <VerticalButton
          title={{
            enable: t('MAIN.ACTIVE_MEETING.BOTTOM_CONTROLS.STOP_VIDEO'),
            disable: t('MAIN.ACTIVE_MEETING.BOTTOM_CONTROLS.START_VIDEO'),
          }}
          icon="Webcam"
          onPress={changeVideoState}
          enable={isVideoEnabled}
        />
        <VerticalButton
          title={{ enable: t('MAIN.ACTIVE_MEETING.BOTTOM_CONTROLS.PARTICIPANTS') }}
          icon="Participants"
          onPress={() => openMenu({ name: 'Participants', participants: menuParticipants, uniqueName: id })}
          params={{ participants: participants.size }}
        />
        <VerticalButton
          title={{ enable: t('MAIN.ACTIVE_MEETING.BOTTOM_CONTROLS.CHAT') }}
          icon="Chat"
          params={{ hasNewMessages: isUnreadMessages }}
          onPress={() => {
            openMenu({ name: 'Messages' });
            store.dispatch(toggleUnread(false));
          }}
        />
        <VerticalButton
          title={{ enable: t('MAIN.ACTIVE_MEETING.BOTTOM_CONTROLS.LEAVE') }}
          icon="Leave"
          onPress={onPress}
        />
      </FooterTab>
    </Footer>
  );
};
