import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

interface IModalButtonProps {
  onPress: () => void;
  title: string;
  hasMargin?: boolean;
  rightButton?: boolean;
}

export const ModalButton = ({ onPress, title, rightButton = false, hasMargin = true }: IModalButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        rightButton ? styles.rightButton : styles.leftButton,
        hasMargin ? styles.rightPadding : null,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
