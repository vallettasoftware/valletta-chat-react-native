import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 0,
  },
  flexContainer: {
    flex: 1,
  },
  input: {
    color: '#000',
    flex: 4,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    marginRight: 10,
    padding: 0,
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 21,
    padding: 13,
  },
  messagesContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 0,
  },
  messagesList: {
    padding: 10,
  },
  sendButton: {
    height: 18,
    width: 22.77,
  },
});
