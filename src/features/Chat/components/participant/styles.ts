import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: '#4892E4',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    width: 60,
  },
  disabledVideoContainer: {
    alignItems: 'center',
    backgroundColor: '#103E70',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fontSize16: {
    fontSize: 16,
  },
  imageContainer: {
    height: 24,
    width: 24,
  },
  participantContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  participantIdentity: {
    color: '#ffffffdd',
    marginRight: 10,
    marginStart: 10,
    paddingLeft: 2,
    paddingRight: 10,
  },
  participantInformation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
  },
  participantInformationContainer: {
    backgroundColor: '#4169e130',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  participantMicro: {
    height: '120%',
    marginLeft: -8,
    resizeMode: 'contain',
    width: '20%',
  },
});
