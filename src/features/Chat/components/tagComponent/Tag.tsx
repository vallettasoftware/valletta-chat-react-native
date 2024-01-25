import React from 'react';
import { View, Text } from 'native-base';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type TagProps = {
  text: string;
  onPress: (value: string) => void;
};
export const Tag = ({ text, onPress }: TagProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={() => onPress(text)}>
        <Text style={styles.text}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
