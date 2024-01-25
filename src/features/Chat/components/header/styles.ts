import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  activeView: {
    borderColor: '#F2C94C',
    borderWidth: 1,
  },
  button: {
    flexDirection: 'row',
    padding: 7,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#04192F',
    flexDirection: 'row',
    height: 42,
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  disabled: {
    opacity: 0.3,
  },
  image: {
    resizeMode: 'cover',
  },
  logoWrapper: {
    flex: 1,
  },
  menuIcon: {
    width: 28,
  },
  speakerView: {
    backgroundColor: '#404768',
    borderRadius: 3,
    marginRight: 19,
    opacity: 1,
  },
  text: {
    color: '#D0E3F7',
  },
  viewImage: {
    height: 19,
    marginRight: 5,
    width: 17.6,
  },
});
