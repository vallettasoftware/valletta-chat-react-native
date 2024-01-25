import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  arrow: {
    height: 11.38,
    width: 13,
  },
  arrowWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    width: 50,
  },
  container: {
    flex: 1,
  },
  countOfParticipants: {
    color: '#fff',
    padding: 4,
  },
  countOfParticipantsWrapper: {
    alignItems: 'center',
    backgroundColor: '#2f6467',
    borderRadius: 50,
    justifyContent: 'center',
    marginLeft: 5,
    width: 27,
  },
  disabled: {
    opacity: 0.4,
  },
  inviteText: {
    color: '#9fa5c0',
    opacity: 0.4,
  },
  inviteTextWrapper: {
    marginLeft: 5,
  },
  inviteWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  justLogo: {
    height: 78,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
  participantsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    margin: 0,
  },
  titleWrapper: {
    alignItems: 'center',
    backgroundColor: '#172837',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
