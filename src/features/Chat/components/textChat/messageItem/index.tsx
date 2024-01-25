import React from 'react';
import { Text, View } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import moment from 'moment';
import TextAvatar from '../TextAvatar';
import { styles } from './styles';

type Props = {
  text: string;
  name: string;
  time: Date;
  isOwn: boolean;
};

const Message: React.FC<Props> = ({ text, name, time, isOwn }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.info, isOwn ? styles.infoOwn : styles.infoCommon]}>
        {name},{moment(time).format('HH:mm')}
      </Text>
      <View style={[styles.messageContainer, isOwn ? styles.messageContainerOwn : styles.messageContainerCommon]}>
        <Hyperlink linkStyle={styles.linkStyle} linkDefault>
          <Text style={styles.text}>{text}</Text>
        </Hyperlink>
        <View style={[styles.avatar, isOwn ? styles.avatarOwn : styles.avatarCommon]}>
          <TextAvatar name={name} />
        </View>
      </View>
    </View>
  );
};

export default Message;
