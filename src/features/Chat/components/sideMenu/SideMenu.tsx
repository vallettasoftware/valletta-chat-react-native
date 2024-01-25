import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Message } from 'twilio-chat/lib/message';
import MessagesChat from '../textChat/MessagesChat';
import SideMenuHeader from './SideMenuHeader';

type Props = {
  closeMenu: () => void;
  title: string;
  messages: Message[];
  sendMessage: (message: string) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const SideMenu = ({ closeMenu, title, messages, sendMessage }: Props) => {
  return (
    <View style={styles.container}>
      <SideMenuHeader closeMenu={closeMenu} title={title} />
      <MessagesChat messages={messages} sendMessage={sendMessage} />
    </View>
  );
};
