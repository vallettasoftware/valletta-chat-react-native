import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import { getStyles } from './styles';
import { fonts } from '../../../../../../../common/font';
import { EmailsList } from './emailsList';
import { t } from '../../../../../../../common/i18n';

interface IInviteListProps {
  emails: string[];
  setEmail: (email: string) => void;
  removeEmail: (email: string) => void;
  isLoading: boolean;
  selectedEmail?: {
    email: string;
    index: number;
  };
}

export const InviteList = ({ emails, selectedEmail, setEmail, removeEmail, isLoading }: IInviteListProps) => {
  const { width } = Dimensions.get('window');
  const styles = getStyles(width);
  const hasList = emails && !!emails.length;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>{t('MAIN.MEETINGS.INVITE_PARTICIPANTS.MAILING_LIST')}:</Text>
          <View style={styles.countWrapper}>
            <Text style={styles.countText}>{emails.length}</Text>
          </View>
        </View>
        {hasList && (
          <EmailsList
            setEmail={setEmail}
            removeEmail={removeEmail}
            emails={emails}
            isLoading={isLoading}
            selectedEmail={selectedEmail}
          />
        )}
      </View>
    </View>
  );
};
