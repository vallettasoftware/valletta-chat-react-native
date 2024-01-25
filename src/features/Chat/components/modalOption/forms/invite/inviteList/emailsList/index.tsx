import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';

import { getStyles } from './styles';
import { Emails } from './emails';

interface IEmailsList {
  emails: string[];
  setEmail: (email: string) => void;
  removeEmail: (email: string) => void;
  isLoading: boolean;
  selectedEmail?: {
    email: string;
    index: number;
  };
}

export const EmailsList = ({ emails, setEmail, removeEmail, selectedEmail, isLoading }: IEmailsList) => {
  const isSelected = (index: number) => !!selectedEmail && selectedEmail.index === index;
  const { height } = Dimensions.get('window');
  const styles = getStyles(height);

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled
        style={styles.flatListContainer}
        keyExtractor={(item) => item}
        data={emails}
        renderItem={({ item, index }) => (
          <Emails setEmail={setEmail} removeEmail={removeEmail} email={item} isLoading={isLoading} isSelected={isSelected(index)} />
        )}
      />
    </View>
  );
};
