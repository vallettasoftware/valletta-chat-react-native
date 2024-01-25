import { ThunkDispatch } from '@reduxjs/toolkit';
import { Message } from 'twilio-chat/lib/message';
import { connect } from 'react-redux';
import { Chat } from './Chat';
import { RootState } from '../../../../store';
import { ChatDispatchToProps, ChatStateToProps } from './models';
import {
  setActiveSpeaker,
  setAudioEnabled,
  setCameraActivity,
  setMySpeakerId,
  setStatus,
  setVideoEnabled,
  setIdentity,
} from '../../../../store/conference/data';
import { StatusConnection } from '../../enums/statusConnection';
import { ConnectData, connectToRoom } from '../../../../store/conference/shared';
import {
  addMessage,
  setLastMessageIndex,
  setMessages,
  subscribeOnChat,
  toggleUnread,
  getCurrentTextChat
} from '../../../../store/conference/messages';
import { IMenuComponent } from '../../../../store/models/common/Menu';
import { setMenuComponent } from '../../../../store/Main';
import { checkAuth } from '../../../../common/checkAuthHoc';
import { disconnectActionType } from '../../../../store/utils/actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, any>): ChatDispatchToProps => {
  return {
    setIdentity: (newValue) => dispatch(setIdentity(newValue)),
    setMySpeakerId: (newValue: string) => dispatch(setMySpeakerId(newValue)),
    setActiveSpeaker: (newValue: string) => dispatch(setActiveSpeaker(newValue)),
    setAudioEnabled: (newValue: boolean) => dispatch(setAudioEnabled(newValue)),
    setVideoEnabled: (newValue: boolean) => dispatch(setVideoEnabled(newValue)),
    setStatus: (newValue: StatusConnection) => dispatch(setStatus(newValue)),
    connectToRoom: (data: ConnectData) => dispatch(connectToRoom(data)),
    setMenu: (param: IMenuComponent) => dispatch(setMenuComponent(param)),
    add: (message: Message) => dispatch(addMessage(message)),
    toggle: (param: boolean) => dispatch(toggleUnread(param)),
    set: (messages: Message[]) => dispatch(setMessages(messages)),
    setCamera: (param: boolean) => dispatch(setCameraActivity(param)),
    setLastIndex: (param) => dispatch(setLastMessageIndex(param)),
    subscribeOnChat: () => dispatch(subscribeOnChat()),
    getCurrentTextChat: (uniqueName: number) => dispatch(getCurrentTextChat(uniqueName)),
    disconnect: () => dispatch({ type: disconnectActionType }),
  };
};

const mapStateToProps = (state: RootState): ChatStateToProps => {
  return {
    mySpeakerId: state.conferenceData.mySpeakerId,
    headphone: state.user.headphone,
    isVideoEnabled: state.conferenceData.isVideoEnabled,
    isAudioEnabled: state.conferenceData.isAudioEnabled,
    channelUniqueName: state.conferenceData.roomInfo?.channelUniqueName
  };
};

export default checkAuth(connect(mapStateToProps, mapDispatchToProps)(Chat));
