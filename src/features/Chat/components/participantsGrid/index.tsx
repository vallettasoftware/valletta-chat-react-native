import React, { PropsWithChildren } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { IParticipantConfig } from '../../../../store/models/common/Participants';
import { ParticipantItem } from '../participantItem';
import { styles } from './styles';

interface IParticipantsGrid {
  participantViewsHash: Map<string, IParticipantConfig>;
}

export const ParticipantsGrid: React.FC<IParticipantsGrid> = (props: PropsWithChildren<IParticipantsGrid>) => {
  const { activeSpeakerId, mySpeakerId, isSpeakerView } = useSelector((state: RootState) => state.conferenceData);
  const { participantViewsHash, children } = props;
  const participantsOnPage = children as JSX.Element[];

  const { width } = Dimensions.get('window');
  const speakerItemWidth = width / 4;
  const speakerItemHeight = speakerItemWidth * 1.33;

  const currentSpeaker = activeSpeakerId || mySpeakerId;

  const getCountOfRowsOnPage = (countOfParticipant: number): number => {
    if (countOfParticipant === 1 || isSpeakerView) {
      return 1;
    }

    return countOfParticipant >= 5 ? 3 : 2;
  };

  const calculateParticipantsInRows = (countOfParticipants: number, countOfRows: number): number[] => {
    let participantsInRows = [];

    if (countOfParticipants % countOfRows === 0) {
      const count = countOfParticipants / countOfRows;

      for (let i = 0; i < countOfRows; i++) {
        participantsInRows.push(count);
      }
    } else {
      const firstRow = Math.floor(countOfParticipants / countOfRows) + 1;

      if (countOfRows === 2) {
        participantsInRows = [firstRow, countOfParticipants - firstRow];
      } else {
        const residue = countOfParticipants - firstRow;
        const secondRow = Math.floor(residue / countOfRows) + 1;
        const thirdRow = residue - secondRow;
        participantsInRows = [firstRow, secondRow, thirdRow];
      }
    }

    return participantsInRows.sort((a: number, b: number) => b - a);
  };

  const sliceParticipantsOnPage = (participantsOnPage: JSX.Element[], countParticipantsInRows: number[]) => {
    const participants: JSX.Element[][] = [];
    let start = 0;

    countParticipantsInRows.forEach((count) => {
      participants.push(participantsOnPage.slice(start, start + count));
      start += count;
    });

    return participants;
  };

  const countOfRows: number = getCountOfRowsOnPage(participantsOnPage?.length || 0);
  const countParticipantsInRows = calculateParticipantsInRows(participantsOnPage.length, countOfRows);
  const participantsByRowsOnPage = sliceParticipantsOnPage(participantsOnPage, countParticipantsInRows);

  if (isSpeakerView) {
    return (
      <View style={styles.flexContainer}>
        <View style={{ height: speakerItemHeight }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.messagesList}
            data={Array.from(participantViewsHash).filter((item) => item[0] !== currentSpeaker)}
            renderItem={({ item, index }) => {
              const config = item[1];

              return (
                <View key={item[0]} style={{ width: speakerItemWidth }}>
                  <ParticipantItem config={config} sid={item[0]} />
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.activeSpeakerBorder}>
          {currentSpeaker && (
            <ParticipantItem config={participantViewsHash.get(currentSpeaker)!} sid={currentSpeaker} />
          )}
        </View>
      </View>
    );
  }
  return (
    <View style={styles.flexContainer}>
      {participantsByRowsOnPage.map((participantsInRow, index) => {
        return (
          <View key={index} style={styles.rowContainer}>
            {participantsInRow.map((participant, index) => {
              return (
                <View key={index} style={styles.flexContainer}>
                  {participant}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
