import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: '#4892E4',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    width: 36,
  },
  avatarCommon: {
    left: -25,
    top: -13,
  },
  avatarOwn: {
    bottom: -18,
    right: -10,
  },
  container: {
    marginTop: 11,
  },
  info: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    lineHeight: 15,
    marginBottom: 5,
  },
  infoCommon: {
    paddingLeft: 46,
  },
  infoOwn: {
    paddingLeft: 27,
  },
  last: {
    marginBottom: 20,
  },
  linkStyle: {
    color: '#d0e3f7',
    textDecorationLine: 'underline',
  },
  messageContainer: {
    paddingHorizontal: 19,
    paddingVertical: 10,
    position: 'relative',
  },
  messageContainerCommon: {
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 27,
  },
  messageContainerOwn: {
    backgroundColor: `rgba(41,128,191,0.2)`,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 15,
    marginLeft: 16,
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 17,
  },
});
