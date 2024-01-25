import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#2F6467',
    bottom: 0,
    height: 20,
    position: 'absolute',
    right: 3,
    width: 20,
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  chatBadge: {
    backgroundColor: '#FF7070',
    height: 12,
    position: 'absolute',
    right: -5,
    top: -3,
    width: 10,
  },
  disabled: {
    opacity: 0.4,
  },
  relativeWrapper: {
    position: 'relative',
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
  wrapper: {
    flex: 1,
    width: 70,
  },
});
