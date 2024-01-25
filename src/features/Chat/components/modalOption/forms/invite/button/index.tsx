import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

interface IInputButtonProps {
  image: ImageSourcePropType;
  onPress: () => void;
  hasError?: boolean
}

export const InputButton = ({ image, onPress, hasError }: IInputButtonProps) => {
  return (
    <View style={[styles.inputButtonContainer, hasError ? styles.inputButtonError : null]}>
      <View style={styles.inputButton}>
        <TouchableOpacity onPress={onPress}>
          <Image source={image} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
