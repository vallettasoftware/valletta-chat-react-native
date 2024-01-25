import React, { FC } from 'react';
import { TwilioVideoParticipantView, TwilioVideoLocalView } from 'react-native-twilio-video-webrtc';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { IParticipantConfig } from '../../../../store/models/common/Participants';
import { Participant } from '../participant';
import { styles } from './styles';
import { setActiveSpeaker } from '../../../../store/conference/data';
interface IParticipantItemProps {
  config: IParticipantConfig;
  sid: string;
}

export const ParticipantItem: FC<IParticipantItemProps> = (props: IParticipantItemProps) => {
  const dispatch = useDispatch();
  const { isSpeakerView, activeSpeakerId } = useSelector((state: RootState) => state.conferenceData);
  const { config, sid } = props;
  const { videoTrackSid, participantSid, isVideoEnabled, isAudioEnabled, isRemote } = config;

  const handleActiveSpeaker: (v: string) => void = (newValue) => dispatch(setActiveSpeaker(newValue));

  const onParticipantTap = () => {
    if (isSpeakerView && sid !== activeSpeakerId) {
      handleActiveSpeaker(sid);
    }
  };

  return (
    <Participant
      isVideoEnabled={Boolean(isVideoEnabled)}
      isAudioEnabled={Boolean(isAudioEnabled)}
      sid={sid}
      name={config.name}
      onPress={onParticipantTap}
    >
      {isRemote ? (
        <TwilioVideoParticipantView trackIdentifier={{ participantSid, videoTrackSid }} style={styles.flexContainer} />
      ) : (
        <TwilioVideoLocalView enabled style={styles.flexContainer} />
      )}
    </Participant>
  );
};
