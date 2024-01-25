import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 15,
    flex: 1,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    ...Platform.select({
      ios: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 18 : 20,
        paddingBottom: 20,
        textAlign: 'center'
      },
      android: {
        padding: 20,
      },
    }),
  },
  leftButton: {
    backgroundColor: '#32475A',
  },
  rightButton: {
    backgroundColor: '#4993e4',
  },
  rightPadding: {
    marginLeft: 10,
  },
});
