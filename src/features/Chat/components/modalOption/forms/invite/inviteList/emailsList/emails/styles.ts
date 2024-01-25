import { StyleSheet } from 'react-native';
import { fonts } from '../../../../../../../../../common/font';

export const getStyles = (width: number) =>
  StyleSheet.create({
    closeImage: {
      margin: 5,
      resizeMode: 'contain',
    },
    container: {
      alignSelf: 'flex-start',
      borderRadius: 50,
      flex: 1,
      marginTop: 7,
    },
    emailContainer: {
      alignItems: 'center',
      backgroundColor: '#438ee1',
      borderRadius: 36,
      flexDirection: 'row',
      maxWidth: '100%',
      minHeight: 41,
      paddingVertical: 8,
    },
    loadingEmailContainer: {
      backgroundColor: 'rgba(67, 142, 225, 0.62)',
    },
    emailText: {
      color: '#fff',
      fontSize: fonts.mini(width),
    },
    image: {
      alignItems: 'center',
      backgroundColor: '#ffffff55',
      borderRadius: 50,
      justifyContent: 'center',
      padding: 3,
    },
    imageContainer: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    logoImage: {
      padding: 10,
      resizeMode: 'contain',
    },
    notSelectedEmail: {
      maxWidth: '90%',
      paddingRight: 11,
    },
    selectedEmail: {
      maxWidth: '74%',
    },
    selectedEmailContainer: {
      borderColor: '#70ff98',
      borderWidth: 2,
    },
    withoutLogoSelectedContainer: {
      paddingLeft: 11,
    },
    withoutLogoNotSelectedContainer: {
      paddingHorizontal: 11,
    },
    withoutLogoNotSelectedEmail: {
      maxWidth: '100%',
    },
    withoutLogoSelectedEmail: {
      maxWidth: '90%',
    },
    wrapper: {
      alignSelf: 'flex-start',
    },
  });
