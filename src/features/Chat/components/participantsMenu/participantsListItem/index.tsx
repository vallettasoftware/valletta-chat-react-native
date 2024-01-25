import React from 'react';
import { Image, Text, View, Dimensions } from 'react-native';
import { fonts } from '../../../../../common/font';
import { IMenuParticipants } from '../../../../../store/models/common/Participants';
import { RoundedAvatar } from '../../roundAvatar';
import { styles } from './styles';

const workedMicro = require('../../../../../assets/icons/Mic.png');
const mutedMicro = require('../../../../../assets/icons/noun_Mic.png');

interface IMenuParticipantListItemProps {
  menuParticipant: IMenuParticipants;
}

export const MenuParticipantsListItem = ({ menuParticipant }: IMenuParticipantListItemProps) => {
  const { width } = Dimensions.get('window');
  const { name, isAudioEnabled, picture } = menuParticipant;
  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <View style={styles.miniContainer}>
          <RoundedAvatar name={name} picture={picture} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textCenterContainer}>
            <Text style={[styles.text, { fontSize: fonts.mini(width) }]}>{name}</Text>
          </View>
        </View>
        <View style={styles.miniContainer}>
          <View style={styles.centeredMicro}>
            <Image source={isAudioEnabled ? workedMicro : mutedMicro} style={styles.micro} />
          </View>
        </View>
      </View>
    </View>
  );
};
