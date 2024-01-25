import React from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';

import { getStyles } from './styles';

interface IEmailsProps {
  email: string;
  setEmail: (email: string) => void;
  removeEmail: (email: string) => void;
  isSelected: boolean;
  isLoading: boolean;
  inSystem?: boolean;
}

export const Emails = ({ inSystem = false, setEmail, email, removeEmail, isSelected, isLoading }: IEmailsProps) => {
  const { width } = Dimensions.get('window');
  const styles = getStyles(width);
  let emailStyle;
  let containerStyle;

  if (inSystem) {
    emailStyle = isSelected ? styles.selectedEmail : styles.notSelectedEmail;
  } else {
    emailStyle = isSelected ? styles.withoutLogoSelectedEmail : styles.withoutLogoNotSelectedEmail;
    containerStyle = isSelected ? styles.withoutLogoSelectedContainer : styles.withoutLogoNotSelectedContainer;
  }

  const tapOnEmail = () => setEmail(email);

  const remove = () => {
    setEmail('');
    removeEmail(email);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={!isSelected ? tapOnEmail : undefined}>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.emailContainer,
            containerStyle,
            isLoading ? styles.loadingEmailContainer : null,
            isSelected ? styles.selectedEmailContainer : null,
          ]}
        >
          {inSystem && (
            <View style={styles.imageContainer}>
              <View style={styles.image}>
                <Image style={styles.logoImage} source={require('../../../../../../../../../assets/icons/logo.png')} />
              </View>
            </View>
          )}
          <View style={emailStyle}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.emailText}>
              {email}
            </Text>
          </View>
          {isSelected && (
            <TouchableOpacity onPress={remove}>
              <View style={styles.imageContainer}>
                <View style={styles.image}>
                  <Image
                    style={styles.closeImage}
                    source={require('../../../../../../../../../assets/icons/close.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
