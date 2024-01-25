import React, { useRef } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { IParticipantConfig } from '../../../../store/models/common/Participants';
import { StatusConnection } from '../../enums/statusConnection';
import { ParticipantsGrid } from '../participantsGrid';
import { ParticipantItem } from '../participantItem';
import { styles } from './styles';
import { setActiveParticipants } from '../../../../store/conference/data';
interface IParticipantsProps {
  participants: Map<string, IParticipantConfig>;
}

export const Participants: React.FC<IParticipantsProps> = (props) => {
  const { status, isSpeakerView, activeSpeakerId, mySpeakerId } = useSelector(
    (state: RootState) => state.conferenceData,
  );
  const dispatch = useDispatch();
  const participantViewsHash = useRef(new Map<string, IParticipantConfig>());
  const { participants } = props;

  const createParticipantsViews = (): JSX.Element[] => {
    participantViewsHash.current.clear();
    const currentSpeakerId = activeSpeakerId || mySpeakerId;

    return Array.from(participants)
      .map(([sid, participantConfig]) => {
        const participantView: JSX.Element = <ParticipantItem config={participantConfig} sid={sid} key={sid} />;
        participantViewsHash.current.set(sid, participantConfig);
        return participantView;
      }) as JSX.Element[];
  };

  const getParticipantsByPages = (countOfPages: number): JSX.Element[][] => {
    const participantViews = createParticipantsViews();
    let start = 0;

    return Array.from({ length: countOfPages }).reduce<JSX.Element[][]>((accum, _, ind) => {
      if (isSpeakerView) {
        accum.push(participantViews);
      } else {
        accum.push(participantViews.slice(start, start + 9));
        start += 9;
      }
      return accum;
    }, []);
  };

  const countParticipantsByPages = (): JSX.Element[][] => {
    const countOfParticipants = participants.size + 1;
    
    dispatch(setActiveParticipants(participants.size));

    let countOfPages = 1;

    if (!isSpeakerView) {
      countOfPages = countOfParticipants % 9 === 0 ? countOfParticipants / 9 : Math.floor(countOfParticipants / 9) + 1;
    }
    return getParticipantsByPages(countOfPages);
  };

  let view;

  switch (status) {
    case StatusConnection.CONNECTED:
      view = (
        <View style={styles.callWrapper}>
          <View style={styles.conferenceContainer}>
            <View style={styles.flexContainer}>
              <ParticipantsGrid participantViewsHash={participantViewsHash.current}>
                {countParticipantsByPages()}
              </ParticipantsGrid>
            </View>
          </View>
        </View>
      );
      break;
    case StatusConnection.CONNECTING:
      view = <View style={styles.callWrapper} />;
      break;
    default:
      view = <View style={styles.flexContainer} />;
      break;
  }

  return view;
};
