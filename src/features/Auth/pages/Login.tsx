import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Linking } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RouteProp } from '@react-navigation/core';
import { appPrefix, AuthRoutes } from '../../../Navigation';
import AuthService from '../services/AuthService';
import LogoHeader from '../../../components/LogoHeader';
import Button from '../../../components/Button';
import { errorTypes } from '../../../common';
import { SharpDevBackground } from '../../../components/imageBackround';
import { t } from '../../../common/i18n';
import { useUser } from '../../../common/useUser';

type FormValues = {
  email: string;
  password: string;
};

type AuthNavProps = StackNavigationProp<AuthRoutes, 'Login'>;

type Props = {
  navigation: AuthNavProps;
  route?: RouteProp<any, any>;
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  emaillink: {
    color: '#fff',
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  error: {
    alignSelf: 'flex-start',
    color: '#FF9B9B',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    fontSize: 18,
    lineHeight: 22,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  inputError: {
    backgroundColor: '#FFDEDE',
    borderBottomWidth: 2,
    borderColor: '#FF7070',
    color: '#FF7070',
  },
  inputView: {
    alignSelf: 'stretch',
    marginBottom: 44,
  },
  link: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 22,
  },
  loadingInput: {
    backgroundColor: '#9099A1',
    color: '#223343',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
  },
  transparentButton: {
    marginTop: 25,
  },
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')).email(t('COMMON.ERRORS.EMAIL_IS_INCORRECT')),
  password: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')),
});

const Login: React.FC<Props> = ({ navigation, route }: Props) => {
  const { login, ready, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [confirmEmail, setconfirmEmail] = useState(false);
  const [email, setEmail] = useState('');

  const goToMeetings = () => Linking.openURL(`${appPrefix}meetings`);

  useEffect(() => {
    if (ready && user.email) goToMeetings();
  }, [ready, user]);

  const onSubmit = async (values: FormValues, { setErrors, resetForm }: FormikHelpers<FormValues>) => {
    setLoading(true);
    setconfirmEmail(false);
    try {
      await login(values.email, values.password);
      resetForm();
      if (route?.params?.email === values.email) {
        Linking.openURL(`${appPrefix}meetings/${route?.params?.uniqueName}`);
      }     
      resetForm();
    } catch (error) {
      if (error.message === '101') {
        setconfirmEmail(true);
        setEmail(values.email);
      }
      setErrors({
        email: errorTypes.signin[error.message],
        password: errorTypes.signin[error.message],
      });
    }
    setLoading(false);
  };

  const emailConfirmation = async () => {
    if (email) {
      const res = await AuthService.SendConfirmEmail(email);
    }
  };

  return (
    <SharpDevBackground>
      <KeyboardAwareScrollView style={styles.background}>
        <LogoHeader title={t('COMMON.ACTIONS.LOGIN')} />
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={LoginSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleChange, handleSubmit, values, errors, setFieldError }) => (
            <View style={styles.container}>
              <View style={styles.inputView}>
                <TextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onFocus={() => setFieldError('email', '')}
                  style={[styles.input, errors.email ? styles.inputError : null, loading ? styles.loadingInput : null]}
                  placeholder={t('COMMON.FIELDS.EMAIL')}
                  autoCapitalize="none"
                  placeholderTextColor="#929292"
                />
                <View style={styles.row}>
                  {!!errors.email && <Text style={[styles.error, styles.text]}>{errors.email}</Text>}
                  {confirmEmail && (
                    <TouchableOpacity onPress={emailConfirmation}>
                      <Text style={styles.emaillink}>{t('AUTH.CONFIRM_EMAIL.RESEND_EMAIL')}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={styles.inputView}>
                <TextInput
                  value={values.password}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onFocus={() => setFieldError('password', '')}
                  placeholder={t('COMMON.FIELDS.PASSWORD')}
                  placeholderTextColor="#929292"
                  style={[
                    styles.input,
                    errors.password ? styles.inputError : null,
                    loading ? styles.loadingInput : null,
                  ]}
                />
                {!!errors.password && <Text style={[styles.error, styles.text]}>{errors.password}</Text>}
              </View>

              <Button
                onPress={() => handleSubmit()}
                disabled={!ready}
                propStyles={{ paddingVertical: 19, borderRadius: 10 }}
                type="primary"
                title={t('COMMON.ACTIONS.LOGIN')}
              />

              <TouchableOpacity
                disabled={!ready}
                style={styles.transparentButton}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.link}>{t('AUTH.SIGN_UP.FORGOT_PASSWORD')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!ready}
                style={styles.transparentButton}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.link}>{t('AUTH.SIGN_IN.CREATE_ACCOUNT')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SharpDevBackground>
  );
};

export default Login;
