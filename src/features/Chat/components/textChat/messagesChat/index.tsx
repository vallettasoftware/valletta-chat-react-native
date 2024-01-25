import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, TouchableHighlight, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput } from '../../../../../components/TextInput';
import { RootState } from '../../../../../store';
import MessageItem from '../messageItem';
import { t } from '../../../../../common/i18n';
import { styles } from './styles';
import { sendNewTextMessage } from '../../../../../store/conference/messages';
import { Message } from '../../../../../store/conference/messages';

const MessagesChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const { email } = useSelector((state: RootState) => state.user);
  const { messages, lastMessageIndex } = useSelector((state: RootState) => state.conferenceMessages);
  const { channelUniqueName } = useSelector((state: RootState) => state.conferenceData.roomInfo);
  const dispatch = useDispatch();

  const getMessagesRenderItems = (messages: Message[]) => {
    if (messages.length) {
      const render = messages.map((m) => {
        return {
          text: m.message,
          name: m.authorName,
          time: m.dateUtc,
          isOwn: m.authorEmail === email,
        };
      });
      return render.reverse();
    }
    return [];
  };

  const sendNewMessage = () => {
    if (channelUniqueName) {
      dispatch(sendNewTextMessage({ channelUniqueName, message }));
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flexContainer}
        keyboardVerticalOffset={100}
      >
        <View style={styles.messagesContainer}>
          <FlatList
            style={styles.messagesList}
            data={getMessagesRenderItems(messages)}
            renderItem={({ item }) => (
              <MessageItem text={item.text} name={item.name || ''} time={item.time} isOwn={item.isOwn} />
            )}
            keyExtractor={(item, index) => index.toString()}
            inverted
          />

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={t('MAIN.ACTIVE_MEETING.RIGHT_CONTROLS.TYPE_MESSAGE_HERE')}
              placeholderTextColor="#929292"
              style={styles.input}
              value={message}
              onChangeText={(t) => {
                setMessage(t);
              }}
            />
            <TouchableHighlight onPress={sendNewMessage}>
              <Image source={require('../../../../../assets/icons/Send.png')} style={styles.sendButton} />
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesChat;
