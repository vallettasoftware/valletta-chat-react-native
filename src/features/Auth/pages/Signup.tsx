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
import Modal from '../components/Modal';
import { errorTypes } from '../../../common';
import { t } from '../../../common/i18n';

type AuthNavProp = StackNavigationProp<AuthRoutes, 'Signup'>;

type Props = {
  navigation: AuthNavProp;
};

type FormValues = {
  name: string;
  email: string;
  password: string;
  repassword: string;
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
  text: {
    fontSize: 14,
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

const SignupSchema = Yup.object().shape({
  name: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')),
  email: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')).email(t('COMMON.ERRORS.EMAIL_IS_INCORRECT')),
  password: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')),
  repassword: Yup.string()
    .required(t('COMMON.ERRORS.REQUIRED_FIELD'))
    .oneOf([Yup.ref('password')], t('COMMON.ERRORS.COMPARE_PASSWORDS')),
});

const Signup: React.FC<Props> = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initialValues = { name: '', email: '', password: '', repassword: '' };

  const onSubmit = async (values: FormValues, { setErrors, resetForm }: FormikHelpers<FormValues>) => {
    setIsLoading(true);
    try {
      const res = await AuthService.SignupWithEmail(values.name, values.email, values.password);
      console.log(res);
      setShowModal(true);
      resetForm({});
    } catch (error) {
      setErrors({
        email: errorTypes.signUp[error.message],
      });
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const getInputStyles = (error?: string) => [
    styles.input,
    error ? styles.inputError : null,
    isLoading ? styles.loadingInput : null,
  ];

  const placeholderColor = '#929292';

  return (
    <SharpDevBackground>
      <KeyboardAwareScrollView style={styles.wrapper}>
        <LogoHeader title={t('AUTH.SIGN_UP.SIGN_UP')} />
        {showModal && (
          <Modal
            text={t('AUTH.FORGOT_PASSWORD.REQUEST_SUCCESSFULLY_PERFORMED')}
            navigationCb={() => navigation.navigate('Login')}
          />
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={SignupSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View style={styles.container}>
              <View style={styles.inputView}>
                <TextInput
                  value={values.name}
                  onChangeText={handleChange('name')}
                  style={getInputStyles(!touched.name ? errors.name : undefined)}
                  placeholder={t('COMMON.FIELDS.NAME')}
                  autoCapitalize="none"
                  placeholderTextColor={placeholderColor}
                />
                {errors.name && <Text style={[styles.error, styles.text]}>{errors.name}</Text>}
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={values.email}
                  onChangeText={handleChange('email')}
                  style={getInputStyles(errors.email)}
                  placeholder={t('COMMON.FIELDS.EMAIL')}
                  autoCapitalize="none"
                  placeholderTextColor={placeholderColor}
                />
                {errors.email && <Text style={[styles.error, styles.text]}>{errors.email}</Text>}
              </View>

              <View style={styles.inputView}>
                <TextInput
                  value={values.password}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  placeholder={t('COMMON.FIELDS.PASSWORD')}
                  placeholderTextColor={placeholderColor}
                  style={getInputStyles(errors.password)}
                />
                {errors.password && <Text style={[styles.error, styles.text]}>{errors.password}</Text>}
              </View>

              <View style={styles.inputView}>
                <TextInput
                  value={values.repassword}
                  secureTextEntry
                  onChangeText={handleChange('repassword')}
                  placeholder={t('AUTH.SIGN_UP.CONFIRMATION')}
                  placeholderTextColor={placeholderColor}
                  style={getInputStyles(errors.password)}
                />
                {errors.repassword && <Text style={[styles.error, styles.text]}>{errors.repassword}</Text>}
              </View>

              <Button
                title={t('AUTH.SIGN_UP.CREATE_ACCOUNT')}
                type="primary"
                onPress={() => handleSubmit()}
                propStyles={{ paddingVertical: 19, borderRadius: 10 }}
                disabled={isLoading}
              />

              <TouchableOpacity style={styles.transparentButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>{t('AUTH.SIGN_UP.ALREADY_HAVE_ACCOUNT')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SharpDevBackground>
  );
};

export default Signup;
