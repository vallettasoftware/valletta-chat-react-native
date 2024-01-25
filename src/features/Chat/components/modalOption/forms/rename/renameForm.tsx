import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { t } from '../../../../../../common/i18n';

import { styles } from './styles';

interface IRenameFormProps {
  setArguments: (funcArguments: any) => void;
}

export const RenameForm = ({ setArguments }: IRenameFormProps) => {
  const [friendlyName, setFriendlyName] = useState('');

  const onChange = (text: string) => {
    setFriendlyName(text);
    setArguments(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t('MAIN.MEETINGS.CREATE_MEETING.MEETING_NAME')}
        placeholderTextColor="#929292"
        value={friendlyName}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
};
