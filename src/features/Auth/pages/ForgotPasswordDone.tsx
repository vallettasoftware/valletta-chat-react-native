import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/Button';
import { SharpDevBackground } from '../../../components/imageBackround';
import LogoHeader from '../../../components/LogoHeader';
import { AuthRoutes } from '../../../Navigation';
import Modal from '../components/Modal';
import AuthService from '../services/AuthService';
import { t } from '../../../common/i18n';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 27,
  },
  mail: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: 20,
    textAlign: 'center',
  },
});

type AuthNavProp = StackNavigationProp<AuthRoutes, 'ForgotPassword'>;
type Route = RouteProp<AuthRoutes, 'ForgotPasswordDone'>;

type Props = {
  navigation: AuthNavProp;
  route: Route;
};

const ForgotPasswordDone = ({ navigation, route }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resendConfirmation = async () => {
    setIsLoading(true);
    const { email } = route.params;
    try {
      await AuthService.ForgotPassword(email);
      setShowModal(true);
    } catch (err) {
      console.warn(err);
    }
    setIsLoading(false);
  };

  return (
    <SharpDevBackground>
      <ScrollView style={styles.container}>
        <LogoHeader title={t('AUTH.FORGOT_PASSWORD.PASSWORD_RECOVERY')} />

        <View style={styles.mail}>
          <Image source={require('../../../assets/icons/Mail.png')} />
        </View>

        <Text style={styles.title}>Almost done!</Text>
        <Text style={styles.text}>
          Confirmation e-mail has been sent. Check your e-mail box. If you don’t received message, please check spam
          folder or resend confirmation e-mail
        </Text>
        <Button
          title={t('COMMON.ACTIONS.LOGIN')}
          type="primary"
          onPress={() => navigation.navigate('Login')}
          propStyles={{ padding: 19 }}
        />
        <Button
          title={t('COMMON.ACTIONS.RESEND')}
          type="transparent"
          onPress={resendConfirmation}
          propStyles={{ padding: 19, marginTop: 10 }}
          disabled={isLoading}
        />
      </ScrollView>

      {showModal && (
        <Modal
          text={`${t('AUTH.SIGN_UP_CONFIRM.CONFIRMATION_SENT')}. ${t('AUTH.SIGN_UP_CONFIRM.CHECK_EMAIL_BOX')}. ${t(
            'AUTH.SIGN_UP_CONFIRM.NOT_RECEIVE_MESSAGE',
          )}`}
          navigationCb={() => navigation.navigate('Login')}
        />
      )}
    </SharpDevBackground>
  );
};

export default ForgotPasswordDone;
