import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import Clipboard from '@react-native-community/clipboard';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDispatch, useSelector } from 'react-redux';

import { Room } from '../../../../store/models/responses/Room';
import Button from '../../../../components/Button';
import IconButton from '../../../../components/IconButton';
import { ActionOption } from '../../enums/actionOption';
import SharpTalksModal from '../modalOption';
import { ISharpTalksConfiguration, modalTexts } from '../../../../store/models/common/Modal';
import { ChatService } from '../../services/chatService';
import { RootState } from '../../../../store';
import { startRefresh } from '../../../../store/Main';
import { t } from '../../../../common/i18n';

type Props = {
  chatItem: Room;
  onPress: () => void;
  updateChats: (update: boolean) => void;
};

const styles = StyleSheet.create({
  buttonPropStyle: {
    paddingVertical: 11,
  },
  container: {
    backgroundColor: '#223343',
    borderRadius: 6,
    marginBottom: 14,
    paddingBottom: 23,
    paddingHorizontal: 23,
    paddingTop: 28,
  },
  count: {
    alignItems: 'center',
    backgroundColor: '#2F6467',
    borderRadius: 5,
    height: 23,
    justifyContent: 'center',
    marginLeft: 5,
    padding: 3,
  },
  dotsWrapper: {
    paddingTop: 2,
  },
  iconClipboard: {
    paddingBottom: 9.55,
    paddingLeft: 10.92,
    paddingRight: 10.43,
    paddingTop: 8.72,
  },
  iconShare: {
    alignItems: 'center',
    opacity: 0.4,
    paddingLeft: 12.2,
    paddingRight: 24,
    paddingVertical: 9.2,
  },
  icon_button_wrapper: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  id_wrapper: {
    flex: 4,
    flexDirection: 'row',
    paddingRight: 30,
  },
  label: {
    color: '#6C869E',
    fontSize: 16,
    lineHeight: 19,
  },
  row: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 29,
  },
  white_text: {
    color: '#fff',
  },
  wrapper: {
    flex: 1,
  },
});

const defaultActions = [ActionOption.INVITE, ActionOption.CANCEL];

const ChatListItem: React.FC<Props> = ({ chatItem, onPress, updateChats }: Props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { listNeedUpdate } = useSelector((state: RootState) => state.main);
  const { email } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const getDate = (date: string) => {
    return moment(date).format('DD.MM.YYYY HH:mm');
  };

  const copyToClipboard = (id: string) => {
    Clipboard.setString(id);
  };

  const refreshChats = () => {
    dispatch(startRefresh(!listNeedUpdate));
    updateChats(!listNeedUpdate);
  };

  const renameMeeting = async (friendlyName: string) => {
    try {
      await ChatService.renameMeeting(friendlyName, chatItem.uniqueName);
      refreshChats();
    } catch (error) {
      SharpTalksModal.showError(error);
    }
  };

  const invitePeople = async (emails: string[]) => {
    try {
      if (emails?.length) {
        await ChatService.inviteUsers(emails, chatItem.uniqueName);
        refreshChats();
        SharpTalksModal.show({
          action: ActionOption.SUCCESS,
          modal: modalTexts.successInvite,
          withArguments: false,
          defaultButtonTitle: t('COMMON.ACTIONS.CLOSE'),
        });
      }
    } catch (error) {
      SharpTalksModal.showError(error);
    }
  };

  const deleteMeeting = async () => {
    try {
      if (email) {
        await ChatService.deleteRoom(email, chatItem.uniqueName);
        refreshChats();
      } else {
        SharpTalksModal.showError();
      }
    } catch (error) {
      SharpTalksModal.showError(error);
    }
  };

  const createModalOption = (action: ActionOption): ISharpTalksConfiguration => {
    switch (action) {
      case ActionOption.RENAME:
        return {
          action,
          modal: modalTexts.rename,
          withArguments: true,
          button: { title: t('COMMON.ACTIONS.RENAME'), onPress: renameMeeting },
        };
      case ActionOption.INVITE:
        return {
          action,
          modal: modalTexts.invite,
          withArguments: true,
          button: { title: t('MAIN.MEETINGS.INVITE_PARTICIPANTS.SEND_INVITES'), onPress: invitePeople },
          shouldClose: false,
        };
      case ActionOption.DELETE:
        return {
          action,
          modal: modalTexts.delete,
          withArguments: false,
          button: { title: t('COMMON.ACTIONS.DELETE'), onPress: deleteMeeting },
          swapButtons: true,
        };
      case ActionOption.CANCEL:
        return {
          action,
          modal: modalTexts.default,
          withArguments: false,
        };
      case ActionOption.ERROR:
      default:
        return {
          action: ActionOption.ERROR,
          modal: modalTexts.default,
          withArguments: false,
        };
    }
  };

  const showInviteModal = () => SharpTalksModal.show(createModalOption(ActionOption.INVITE));

  const showActions = () => {
    const options = (chatItem.isOwn ? [ActionOption.RENAME, ActionOption.DELETE] : []).concat(defaultActions);

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        const action = options[buttonIndex];
        const modalOption = createModalOption(action);

        SharpTalksModal.show(modalOption);
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.spaceBetween]}>
        <Text style={styles.title}>{chatItem.friendlyName}</Text>
        <TouchableOpacity style={styles.dotsWrapper} onPress={showActions}>
          <Image source={require('../../../../assets/icons/Vertical_dots.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.id_wrapper}>
          <Text style={styles.label}>ID: </Text>
          <Text style={[styles.label, styles.white_text]} numberOfLines={1}>
            {chatItem.uniqueName}
          </Text>
        </View>

        <View style={styles.icon_button_wrapper}>
          <IconButton
            icon="Clipboard"
            propStyles={styles.iconClipboard}
            onPress={() => copyToClipboard(chatItem.uniqueName.toString())}
          />
          <IconButton
            onPress={() => console.log('Button Share')}
            icon="Share"
            title={t('MAIN.MEETINGS.LIST.SHARE')}
            propStyles={styles.iconShare}
            disabled
          />
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{t('MAIN.MEETINGS.LIST.FIELDS.PARTICIPANTS_ONLINE_TOTAL')}:</Text>
        <View style={styles.count}>
          <Text style={[styles.label, styles.white_text]}>
            {`${chatItem.activeParticipantsCount} / ${chatItem.participantsCount || 0}`}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>{t('MAIN.MEETINGS.LIST.FIELDS.LAST_ACTIVITY')}: </Text>
        <Text style={[styles.label, styles.white_text]}>{getDate(chatItem.dateUpdated)}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.wrapper}>
          <Button
            onPress={showInviteModal}
            title={t('COMMON.ACTIONS.INVITE')}
            type="transparent"
            propStyles={styles.buttonPropStyle}
          />
        </View>
        <View style={styles.wrapper}>
          <Button
            title={t('COMMON.ACTIONS.JOIN')}
            type="primary"
            propStyles={styles.buttonPropStyle}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatListItem;
