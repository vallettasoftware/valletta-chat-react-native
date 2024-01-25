import React from 'react';
import { View, Text } from 'react-native';
import { t } from '../../../../../../common/i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../store';
import IconButton from '../../../../../../components/IconButton';
import Clipboard from '@react-native-community/clipboard';
import { styles } from './styles';

interface IMeetingInfoProps {
  setArguments: (funcArguments: any) => void;
}

export const MeetingInfo = ({ setArguments }: IMeetingInfoProps) => {
  const { roomInfo, activeParticipantsCount } = useSelector((state: RootState) => state.conferenceData);
  
  const copyToClipboard = (id: string) => {
    Clipboard.setString(id);
  };

  return (
    <>
    {roomInfo && <View style={styles.container}>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>{t('MAIN.ACTIVE_MEETING.INFO.MEETING_ID')}</Text>
          <Text style={styles.info}>{roomInfo.uniqueName}</Text>
        </View>
        <IconButton
          icon="Clipboard"
          propStyles={styles.iconClipboard}
          onPress={() => copyToClipboard(roomInfo.uniqueName.toString())}
        />
      </View>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>{t('MAIN.ACTIVE_MEETING.INFO.URL')}</Text>
          <View style={styles.linkBox}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.link}>{`http://videochat.com/meetings/${roomInfo.uniqueName}`}</Text>
            <IconButton
              icon="Clipboard"
              propStyles={styles.iconClipboard}
              onPress={() => copyToClipboard(`http://videochat.com/meetings/${roomInfo.uniqueName}`)}
            />
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>{t('MAIN.ACTIVE_MEETING.INFO.TOTAL_PARTICIPANTS')}</Text>
          <Text style={styles.info}>{activeParticipantsCount}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>{t('MAIN.ACTIVE_MEETING.INFO.OWNER')}</Text>
          <Text style={styles.info}>{roomInfo.author}</Text>
        </View>
      </View>
    </View>}
    </>
  );
};
