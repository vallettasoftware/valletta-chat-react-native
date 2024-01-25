import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  name: string;
  style?: {};
};

const styles = StyleSheet.create({
  textAvatar: {
    color: '#fff',
    fontSize: 11,
  },
});

const TextAvatar = ({ name, style }: Props) => {
  return <Text style={[styles.textAvatar, style]}>{name.slice(0, 2).toUpperCase()}</Text>;
};

export default TextAvatar;
