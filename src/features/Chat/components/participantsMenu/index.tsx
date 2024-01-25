import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { MenuParticipantsListItem } from './participantsListItem';
import { IMenuParticipants } from '../../../../store/models/common/Participants';
import { styles } from './styles';

interface IParticipantMenuProp {
  menuParticipants: IMenuParticipants[];
}

export const ParticipantsMenu = ({ menuParticipants }: IParticipantMenuProp) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={menuParticipants}
        renderItem={({ item }) => <MenuParticipantsListItem menuParticipant={item} />}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};
