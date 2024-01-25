import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Room } from '../../../../store/models/responses/Room';
import { t } from '../../../../common/i18n';

import ChatListItem from './ChatListItem';

type Props = {
  onPress: (id: number, channelId: string) => void;
  chats: Room[];
  updateChats: (update: boolean) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 29,
    marginBottom: 21,
    marginTop: 35,
    textAlign: 'center',
  },
});

const ChatsList: React.FC<Props> = ({ onPress, chats, updateChats }: Props) => {
  const getChatItems = (chats: Room[]) => {
    return chats.map((chat) => (
      <ChatListItem
        chatItem={chat}
        onPress={() => onPress(chat.uniqueName, chat.channelSid)}
        key={chat.sid}
        updateChats={updateChats}
      />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('MAIN.MEETINGS.LIST.YOUR_MEETINGS')}</Text>
      {getChatItems(chats)}
    </ScrollView>
  );
};

export default ChatsList;
