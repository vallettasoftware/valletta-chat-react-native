import React from 'react';
import { Image, Text, View } from 'react-native';

import { styles } from './styles';

interface IRoundAvatarProps {
  name: string;
  picture?: string;
}

export const RoundedAvatar = ({ name, picture }: IRoundAvatarProps) => {
  const emailAvatar = name?.substring(0, 2).toUpperCase();

  return (
    <View style={styles.roundedContainer}>
      <View style={styles.avatarContainer}>
        {picture ? (
          <Image style={styles.roundedContainer} source={{ uri: picture }} />
        ) : (
          <View style={styles.centerTextContainer}>
            <Text style={styles.textAvatar}>{emailAvatar}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
