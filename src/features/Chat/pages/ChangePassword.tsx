import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthRoutes, MainRoutes } from '../../../Navigation';
import Modal from '../../Auth/components/Modal';

import { t } from '../../../common/i18n';
import { useUser } from '../../../common/useUser';
import { SharpDevBackground } from '../../../components/imageBackround';
import Button from '../../../components/Button';
import LogoHeader from '../../../components/LogoHeader';
import authServiceInstance from '../../Auth/services/AuthService';

type AuthNavProp = StackNavigationProp<MainRoutes & AuthRoutes, 'ResetPassword'>;

type Props = {
  navigation: AuthNavProp;
};

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  error: {
    alignSelf: 'flex-start',
    color: 'red',
    paddingLeft: 20,
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
    borderColor: 'red',
  },
  inputView: {
    alignSelf: 'stretch',
    marginBottom: 36,
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
  submit: {
    borderRadius: 10,
    paddingVertical: 19,
  },
  text: {
    fontSize: 16,
  },
  transparentButton: {
    marginTop: 25,
  },
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    width: '100%',
  },
});

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')),
  newPassword: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')),
  confirmNewPassword: Yup.string()
    .required(t('COMMON.ERRORS.REQUIRED_FIELD'))
    .oneOf([Yup.ref('newPassword')], t('COMMON.ERRORS.COMPARE_PASSWORDS')),
});

const ChangePassword: React.FC<Props> = ({ navigation }: Props) => {
  const { user, logout } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initialValues = { currentPassword: '', newPassword: '', confirmNewPassword: '' };

  const onSubmit = async (values: FormValues, { setErrors, setValues }: FormikHelpers<FormValues>) => {
    try {
      setErrors({});
      setIsLoading(true);
      const response = await authServiceInstance.ChangePassword({ ...values, email: user?.email || '' });
      setIsLoading(false);
      const { errorCode, message } = response;
      if (!errorCode) {
        setShowModal(!showModal);
        setValues(initialValues);
      } else setErrors({ currentPassword: message });
    } catch (e) {
      setIsLoading(false);
      setErrors({ currentPassword: e.message });
    }
  };

  const getInputStyles = (error?: string) => [
    styles.input,
    error ? styles.inputError : null,
    isLoading ? styles.loadingInput : null,
  ];

  const goToLogin = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <SharpDevBackground>
      <KeyboardAwareScrollView style={styles.wrapper}>
        {showModal && <Modal navigationCb={goToLogin} text={t('AUTH.CONFIRM_PASSWORD.SUCCESSFUL_CHANGE')} />}
        <LogoHeader title={t('MAIN.HEADER.CHANGE_PASSWORD')} />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={ChangePasswordSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.container}>
              <View style={styles.inputView}>
                <TextInput
                  value={values.currentPassword}
                  secureTextEntry
                  onChangeText={handleChange('currentPassword')}
                  placeholder={t('AUTH.CHANGE_PASSWORD.OLD_PASSWORD')}
                  placeholderTextColor="#929292"
                  style={getInputStyles(errors.currentPassword)}
                />
                {errors.currentPassword && <Text style={[styles.error, styles.text]}>{errors.currentPassword}</Text>}
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={values.newPassword}
                  secureTextEntry
                  onChangeText={handleChange('newPassword')}
                  placeholder={t('AUTH.RESET_PASSWORD.NEW_PASSWORD')}
                  placeholderTextColor="#929292"
                  style={getInputStyles(errors.newPassword)}
                />
                {errors.newPassword && <Text style={[styles.error, styles.text]}>{errors.newPassword}</Text>}
              </View>

              <View style={styles.inputView}>
                <TextInput
                  value={values.confirmNewPassword}
                  secureTextEntry
                  onChangeText={handleChange('confirmNewPassword')}
                  placeholder={t('AUTH.RESET_PASSWORD.REPEAT_PASSWORD')}
                  placeholderTextColor="#929292"
                  style={getInputStyles(errors.confirmNewPassword)}
                />
                {errors.confirmNewPassword && (
                  <Text style={[styles.error, styles.text]}>{errors.confirmNewPassword}</Text>
                )}
              </View>

              <Button
                title={t('AUTH.RESET_PASSWORD.RESET_PASSWORD')}
                type="primary"
                onPress={handleSubmit}
                propStyles={styles.submit}
                disabled={isLoading}
              />
              <TouchableOpacity style={styles.transparentButton} onPress={() => navigation.navigate('Main')}>
                <Text style={styles.link}>{t('COMMON.ACTIONS.CANCEL')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SharpDevBackground>
  );
};

export default ChangePassword;
