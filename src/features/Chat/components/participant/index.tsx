import React, { FC, PropsWithChildren } from 'react';
import { View, Image, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import TextAvatar from '../textChat/TextAvatar';
import { styles } from './styles';
import { fonts } from '../../../../common/font';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const enableMicro = require('../../../../assets/icons/Mic.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const disableMicro = require('../../../../assets/icons/noun_Mic.png');

interface IParticipantProps {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  sid: string;
  name: string;
  onPress: (sid: string) => void;
}

export const Participant: FC<IParticipantProps> = (props: PropsWithChildren<IParticipantProps>) => {
  const { isVideoEnabled, isAudioEnabled, children, sid, name, onPress } = props;
  const { width } = Dimensions.get('window');

  return (
    <TouchableWithoutFeedback onPress={() => onPress(sid)}>
      <View style={styles.participantContainer}>
        {isVideoEnabled ? (
          children
        ) : (
          <View style={styles.disabledVideoContainer}>
            <View style={[styles.avatar]}>
              <TextAvatar name={name} style={styles.fontSize16} />
            </View>
          </View>
        )}
        <View style={styles.participantInformationContainer}>
          <View style={styles.participantInformation}>
            <Image source={isAudioEnabled ? enableMicro : disableMicro} style={styles.participantMicro} />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.participantIdentity, { fontSize: fonts.mini(width) }]}
            >
              {name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
