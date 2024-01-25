import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    height,
    resizeMode: 'stretch',
    width,
  },
});
