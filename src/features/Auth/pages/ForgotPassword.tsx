import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthRoutes } from '../../../Navigation';
import AuthService from '../services/AuthService';
import LogoHeader from '../../../components/LogoHeader';
import Button from '../../../components/Button';
import { SharpDevBackground } from '../../../components/imageBackround';
import { t } from '../../../common/i18n';

type AuthNavProp = StackNavigationProp<AuthRoutes, 'ForgotPassword'>;

type Props = {
  navigation: AuthNavProp;
};

type FormValues = {
  email: string;
};

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')).email(t('COMMON.ERRORS.EMAIL_IS_INCORRECT')),
});

const ForgotPassword: React.FC<Props> = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string>();

  const onSubmit = async (values: FormValues, { setErrors, resetForm }: FormikHelpers<FormValues>) => {
    setIsLoading(true);
    setRequestError(undefined);
    try {
      await AuthService.ForgotPassword(values.email);
      navigation.navigate('ForgotPasswordDone', { email: values.email });
    } catch (err) {
      setRequestError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SharpDevBackground>
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={onSubmit}
          validationSchema={ForgotPasswordSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.container}>
              <LogoHeader title={t('AUTH.FORGOT_PASSWORD.PASSWORD_RECOVERY')} />
              <Text style={styles.info}>
                {`${t('AUTH.FORGOT_PASSWORD.SPECIFY_YOUR_EMAIL')} ${t('AUTH.FORGOT_PASSWORD.WE_WILL_SEND_EMAIL')}`}
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  style={[
                    styles.input,
                    errors.email ? styles.inputError : null,
                    isLoading ? styles.loadingInput : null,
                  ]}
                  placeholder={t('COMMON.FIELDS.EMAIL')}
                  placeholderTextColor="#929292"
                />
                {errors.email && <Text style={[styles.error, styles.text]}>{errors.email}</Text>}
                {requestError && <Text style={[styles.error, styles.text]}>{requestError}</Text>}
              </View>

              <Button
                onPress={() => handleSubmit()}
                propStyles={{ paddingVertical: 19, marginTop: 45 }}
                title={t('AUTH.FORGOT_PASSWORD.RESTORE_PASSWORD')}
                type="primary"
                disabled={isLoading}
              />

              <TouchableOpacity style={styles.transparentButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>{t('AUTH.FORGOT_PASSWORD.CREATE_ACCOUNT')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.transparentButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>{t('AUTH.FORGOT_PASSWORD.I_REMEMBER_PASSWORD')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SharpDevBackground>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  error: {
    alignSelf: 'flex-start',
    color: '#FF9B9B',
  },
  info: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
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
    marginTop: 20,
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
  text: {
    fontSize: 16,
  },
  transparentButton: {
    marginTop: 25,
  },
});
