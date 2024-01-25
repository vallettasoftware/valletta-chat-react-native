import { StyleSheet } from 'react-native';
import { fonts } from '../../../../../common/font';

export const styles = StyleSheet.create({
  centeredMicro: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    height: '150%',
    justifyContent: 'space-around',
  },
  itemContainer: {
    flex: 1,
    marginVertical: 10,
  },
  micro: {
    height: '88%',
    resizeMode: 'contain',
  },
  miniContainer: {
    flex: 0.4,
  },
  text: {
    color: '#fff',
  },
  textCenterContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 2,
    justifyContent: 'center',
  },
});
