import React, { createRef, RefObject, useState } from 'react';
import { Text, TextInput, View, Keyboard } from 'react-native';
import * as Yup from 'yup';
import { Formik, FormikHelpers, FormikProps } from 'formik';

import { styles } from './styles';
import { InputButton } from './button';
import { InviteList } from './inviteList';
import { t } from '../../../../../../common/i18n';

interface IInviteFormProps {
  setArguments: (funcArguments: any) => void;
}

type FormValues = {
  email: string;
};
const InviteSchema = Yup.object().shape({
  email: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')).email(t('COMMON.ERRORS.EMAIL_IS_INCORRECT')),
});

export const InviteForm = ({ setArguments }: IInviteFormProps) => {
  const formik: RefObject<FormikProps<FormValues>> = createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<{ email: string; index: number } | undefined>();

  const onSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    if (!inviteEmails.includes(values.email)) {
      setArguments([...inviteEmails, values.email]);
      setInviteEmails((emails) => [...emails, `${values.email}`]);
    }
    setSelectedEmail(undefined);
    Keyboard.dismiss();
    resetForm();
  };

  const tapOnEmail = (email: string) => {
    if (formik.current) {
      if (selectedEmail) {
        const newInviteEmails = [...inviteEmails];
        newInviteEmails[selectedEmail.index] = selectedEmail.email;
        setInviteEmails(newInviteEmails);
      }

      formik.current.setFieldValue('email', email);
      const findIndex = inviteEmails.findIndex((inviteEmail) => inviteEmail === email);
      setSelectedEmail({ email, index: findIndex });
    }
  };

  const cancelChanges = () => {
    if (selectedEmail) {
      const newInviteEmails = [...inviteEmails];
      newInviteEmails[selectedEmail.index] = selectedEmail.email;
      setInviteEmails(newInviteEmails);
      setSelectedEmail(undefined);
      Keyboard.dismiss();
    }
  };

  const removeEmail = (value: string) => {
    const emails = [...inviteEmails];
    const filtered = emails.filter((email: string) => email !== value);
    setInviteEmails(filtered);
    setSelectedEmail(undefined);
    setArguments(filtered);
  };

  const emailChange = (email: string) => {
    if (selectedEmail) {
      const newInviteEmails = [...inviteEmails];
      newInviteEmails[selectedEmail.index] = email;
      setInviteEmails(newInviteEmails);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('MAIN.MEETINGS.INVITE_PARTICIPANTS.DO_YOU_WANT_INVITE_PEOPLE')}</Text>
      <View style={styles.emailContainer}>
        <Formik
          innerRef={formik}
          initialValues={{ email: '' }}
          onSubmit={onSubmit}
          validationSchema={InviteSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleSubmit, values, errors, setFieldValue, setErrors }) => (
            <View style={styles.emailFieldContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={values.email}
                  onChangeText={(text: string) => {
                    setFieldValue('email', text);
                    emailChange(text);
                  }}
                  style={[
                    styles.input,
                    errors.email ? styles.inputError : null,
                    isLoading ? styles.loadingInput : null,
                  ]}
                  placeholder={t('COMMON.FIELDS.EMAIL')}
                  autoCapitalize="none"
                  placeholderTextColor="#929292"
                />
                {!!values.email && (
                  <InputButton
                    image={require('../../../../../../assets/icons/submit_input.png')}
                    onPress={() => handleSubmit()}
                    hasError={!!errors.email}
                  />
                )}
                {selectedEmail && (
                  <InputButton
                    image={require('../../../../../../assets/icons/refresh.png')}
                    onPress={() => {
                      cancelChanges();
                      setErrors({});
                    }}
                    hasError={!!errors.email}
                  />
                )}
              </View>
              {errors.email && <Text style={[styles.text, styles.error]}>{errors.email}</Text>}
            </View>
          )}
        </Formik>
      </View>
      <InviteList
        setEmail={tapOnEmail}
        emails={inviteEmails}
        removeEmail={removeEmail}
        isLoading={isLoading}
        selectedEmail={selectedEmail}
      />
    </View>
  );
};
