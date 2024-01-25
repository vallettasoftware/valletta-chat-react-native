import React from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { ActionOption } from '../../enums/actionOption';
import SharpTalksModal from '../modalOption';
import { modalTexts } from '../../../../store/models/common/Modal';
import { ChatService } from '../../services/chatService';
import { t } from '../../../../common/i18n';
import { styles } from './styles';

type Props = {
  closeMenu: () => void;
  title?: string;
  countOfParticipants?: number;
  uniqueName?: number;
  justLogo?: boolean;
};

const SideMenuHeader = ({ closeMenu, title, countOfParticipants, uniqueName, justLogo }: Props) => {
  const invite = async (emails: string[]) => {
    try {
      if (emails.length) {
        if (uniqueName) {
          await ChatService.inviteUsers(emails, uniqueName);
        } else {
          SharpTalksModal.showError();
        }
      }
    } catch (error) {
      SharpTalksModal.showError(error);
    }
  };

  const inviteUsers = () => {
    if (uniqueName) {
      SharpTalksModal.show({
        action: ActionOption.INVITE,
        modal: modalTexts.invite,
        withArguments: true,
        button: { title: t('COMMON.ACTIONS.INVITE'), onPress: invite },
      });
    }
  };

  if (justLogo) {
    return (
      <View style={{ ...styles.titleWrapper, ...styles.justLogo }}>
        <Image source={require('../../../../assets/small_logo.png')} style={styles.logo} />
      </View>
    );
  }

  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
      {countOfParticipants && (
        <View style={styles.participantsWrapper}>
          <View style={styles.countOfParticipantsWrapper}>
            <Text style={styles.countOfParticipants}>{countOfParticipants}</Text>
          </View>
          <TouchableOpacity style={styles.container} onPress={() => inviteUsers()}>
            <View style={styles.inviteWrapper}>
              <Image source={require('../../../../assets/icons/Invite.png')} />
              <View style={styles.inviteTextWrapper}>
                <Text style={styles.inviteText}>{t('COMMON.ACTIONS.INVITE')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      <TouchableHighlight onPress={closeMenu} style={styles.arrowWrapper} underlayColor="#172837">
        <Image source={require('../../../../assets/icons/RightArrow.png')} style={styles.arrow} />
      </TouchableHighlight>
    </View>
  );
};

export default SideMenuHeader;
