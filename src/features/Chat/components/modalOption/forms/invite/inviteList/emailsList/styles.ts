import { StyleSheet } from 'react-native';

export const getStyles = (height: number) =>
  StyleSheet.create({
    container: {
      paddingTop: 15,
      width: '100%',
    },
    flatListContainer: {
      maxHeight: height / 3,
    },
  });
