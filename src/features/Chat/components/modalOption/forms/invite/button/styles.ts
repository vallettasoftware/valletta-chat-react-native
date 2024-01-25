import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    marginLeft: 13,
    resizeMode: 'contain',
  },
  inputButton: {
    borderLeftColor: '#9FA5C0',
    borderLeftWidth: 1,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 5,
  },
  inputButtonContainer: {
    flex: 0.2,
    height: '100%',
    paddingRight: 12,
  },
  inputButtonError: {
    backgroundColor: '#FFDEDE',
    borderBottomWidth: 2,
    borderColor: '#FF7070',
    color: '#FF7070',
  },
});
