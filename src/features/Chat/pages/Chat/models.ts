import { Message } from 'twilio-chat/lib/message';
import { StatusConnection } from '../../enums/statusConnection';
import { IMenuComponent } from '../../../../store/models/common/Menu';
import { ConnectData } from '../../../../store/conference/shared';
import { NavProps } from '../../../../common/checkAuthHoc';
import { IParsedParticipant } from '../../../../store/models/common/Participants';

export interface ChatStateToProps {
  mySpeakerId?: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  headphone: {
    audioJack: boolean;
    bluetooth: boolean;
  };
  channelUniqueName?: number;
}

export interface ChatDispatchToProps {
  setIdentity: (param: IParsedParticipant) => void;
  setMenu: (param: IMenuComponent) => void;
  setStatus: (value: StatusConnection) => void;
  add: (message: Message) => void;
  toggle: (param: boolean) => void;
  set: (messages: Message[]) => void;
  setLastIndex: (param: number) => void;
  setMySpeakerId: (value: string) => void;
  setActiveSpeaker: (value: string) => void;
  setAudioEnabled: (value: boolean) => void;
  setVideoEnabled: (value: boolean) => void;
  connectToRoom: (data: ConnectData) => void;
  setCamera: (param: boolean) => void;
  subscribeOnChat: () => void;
  getCurrentTextChat: (uniqueName: number) => void;
  disconnect: () => void;
}

type ChatReduxProps = ChatDispatchToProps & ChatStateToProps;

export type BaseProps = NavProps & ChatReduxProps;
