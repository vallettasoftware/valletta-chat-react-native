import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import { t } from '../../../../common/i18n';
import { styles } from './styles';

interface JoinChatProps {
  navigateToChat: (roomId: number) => void;
  error: string | null;
  clearError: () => void;
}

const JoinChat = (props: JoinChatProps) => {
  const [testWidth, setTestWidth] = useState('99%');
  const [roomId, setRoomId] = useState('');
  const { navigateToChat, error, clearError } = props;

  useEffect(() => {
    setTimeout(() => {
      setTestWidth('100%');
    }, 100);
  }, []);

  const convertUrlToChatId = (url: string) => {
    const searchRes = url.match(/\/?[0-9]+/);
    return searchRes && searchRes[0].slice(1, searchRes[0].length);
  };

  const navigateToChatViaUrl = (chatIdOrUrl: number | string) => {
    const numberTest = Number(chatIdOrUrl);
    const uniqueName =
      numberTest && !Number.isNaN(numberTest) ? numberTest : Number(convertUrlToChatId(chatIdOrUrl as string));

    navigateToChat(uniqueName);
  };

  const handleFocus = () => {
    clearError();
  }

  return (
    <View style={styles.container} removeClippedSubviews={false}>
      <Text style={styles.title}>{t('MAIN.MEETINGS.JOIN_MEETING.JOIN_MEETING')}</Text>
      <Text style={styles.subtitle}>{t('MAIN.MEETINGS.JOIN_MEETING.YOU_CAN_QUICKLY_JOIN')}</Text>
      <TextInput
        onChangeText={setRoomId}
        onFocus={handleFocus}
        style={[styles.input, Boolean(error) ? styles.inputError : null, { width: testWidth }]}
        placeholder={t('MAIN.MEETINGS.JOIN_MEETING.ID_OR_URL')}
        placeholderTextColor="#929292"
      />
      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
      <Button
        onPress={() => navigateToChatViaUrl(roomId)}
        type="primary"
        title={t('COMMON.ACTIONS.JOIN')}
        propStyles={styles.buttonPropStyle}
        disabled={!Boolean(roomId.length)}
      />
    </View>
  );
};

export default JoinChat;
