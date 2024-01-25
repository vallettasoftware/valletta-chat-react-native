import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { ChatService } from '../../services/chatService';
import Button from '../../../../components/Button';
import { setChats } from '../../../../store/Main';
import SharpTalksModal from '../modalOption';
import { ActionOption } from '../../enums/actionOption';
import { modalTexts } from '../../../../store/models/common/Modal';
import { t } from '../../../../common/i18n';
import { styles } from './styles';

const validName = Yup.object().shape({
  chatName: Yup.string().required(t('COMMON.ERRORS.REQUIRED_FIELD')),
});

type FormValue = {
  chatName: string;
};

interface IAddChatProps {
  email?: string;
}

const AddChat: React.FC<IAddChatProps> = ({ email }: IAddChatProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confName, setConfName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    return new Promise((res) => {
      setModalVisible(false);
      setTimeout(() => {
        res(true);
      }, 500);
    });
  };

  const inviteUser = async (emails: string[], uniqueName: number) => {
    try {
      await ChatService.inviteUsers(emails, uniqueName);
      await closeModal();
      SharpTalksModal.show({
        action: ActionOption.SUCCESS,
        modal: modalTexts.successInvite,
        withArguments: false,
        defaultButtonTitle: t('COMMON.ACTIONS.CLOSE'),
      });
    } catch (error) {
      await closeModal();
      SharpTalksModal.showError(error);
    }
  };

  const onSubmit = async (value: FormValue, { setErrors }: FormikHelpers<FormValue>) => {
    try {
      if (value.chatName.length > 256) {
        await closeModal();
        SharpTalksModal.show({
          action: ActionOption.LONG_NAME_ERROR,
          modal: modalTexts.longNameError,
          withArguments: false,
          defaultButtonTitle: t('COMMON.ACTIONS.OK_I_UNDERSTOOD'),
          onClose: () => setTimeout(() => setModalVisible(true), 500)
        });
        return;
      }
      setLoading(true);
      if (email) {
        const newRoom = await ChatService.createRoom(value.chatName);
        const { data } = await ChatService.getChats(email);

        if (data) {
          dispatch(setChats(data));
          await closeModal();
          SharpTalksModal.show({
            action: ActionOption.INVITE,
            modal: modalTexts.invite,
            withArguments: true,
            button: {
              title: t('MAIN.MEETINGS.INVITE_PARTICIPANTS.SEND_INVITES'),
              onPress: (funcArguments) => inviteUser(funcArguments, newRoom.uniqueName),
            },
            shouldClose: false,
          });
        }
      } else {
        await closeModal();
        SharpTalksModal.showError();
      }
    } catch (error) {
      await closeModal();
      SharpTalksModal.showError(error);
    }
    setConfName('');
    setLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      <Button
        type="secondary"
        title={t('MAIN.MEETINGS.CREATE_MEETING.CREATE_NEW_MEETING')}
        propStyles={{ paddingVertical: 18, borderRadius: 10 }}
        onPress={() => setModalVisible(true)}
      />
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.title}>{t('MAIN.MEETINGS.CREATE_MEETING.CREATE_NEW_MEETING')}</Text>
            <Formik
              initialValues={{ chatName: confName }}
              onSubmit={onSubmit}
              validationSchema={validName}
              validateOnBlur={false}
              validateOnChange={false}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      errors.chatName ? styles.inputError : null,
                      loading ? styles.loadingInput : null,
                    ]}
                    placeholder={t('MAIN.MEETINGS.CREATE_MEETING.MEETING_NAME')}
                    placeholderTextColor="#929292"
                    value={values.chatName}
                    onChangeText={e => {
                      handleChange('chatName')(e);
                      setConfName(e);
                    }}
                    editable={!loading}
                  />
                  {errors.chatName && <Text style={[styles.error, styles.text]}>{errors.chatName}</Text>}
                  <Button
                    type="primary"
                    title={t('MAIN.MEETINGS.CREATE_MEETING.CREATE_NEW_MEETING')}
                    propStyles={{ paddingVertical: 18, marginTop: 26 }}
                    onPress={handleSubmit}
                  />
                </View>
              )}
            </Formik>
            <Button
              type="secondary"
              title={t('COMMON.ACTIONS.CLOSE')}
              propStyles={{ paddingVertical: 18, marginTop: 26 }}
              onPress={() => {
                setConfName('');
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddChat;
