import { StyleSheet } from 'react-native';

import { fonts } from '../../../../../../../common/font';

export const getStyles = (width: number) =>
  StyleSheet.create({
    container: {
      paddingTop: 15,
      width: '100%',
    },
    countText: {
      color: '#fff',
      fontSize: fonts.mini(width),
      paddingHorizontal: 5,
      paddingVertical: 3,
    },
    countWrapper: {
      alignItems: 'center',
      backgroundColor: '#2f6467',
      borderRadius: 4,
      justifyContent: 'center',
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      color: '#fff',
      fontSize: fonts.mini(width),
    },
    wrapper: {
      borderTopColor: '#fff',
      width: '100%',
    },
  });
