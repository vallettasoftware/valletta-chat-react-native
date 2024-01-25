import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  box: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%'
  },
  title: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.7
  },
  info: {
    fontSize: 18,
    color: '#fff',
  },
  iconClipboard: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  linkBox: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    alignItems: 'flex-end',
    marginTop: -10
  },
  link: {
    color: '#6889fd',
    fontSize: 18,
    maxWidth: '83%',
  }
});
