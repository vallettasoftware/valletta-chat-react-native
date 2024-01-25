import { IChannel } from '../common/Channel';
import { IConnectionError } from '../common/Error';
import { ErrorCode } from '../../../common/errorCodes';

export interface ICreateRoomResponse {
  sid: string;
  author: string;
  status: string;
  dateCreated: string;
  dateUpdated: string;
  enableTurn: boolean;
  friendlyName: string;
  uniqueName: number;
  statusCallback: string;
  statusCallbackMethod: string;
  endTime: string;
  duration: number;
  type: string;
  maxParticipants: number;
  recordParticipantsOnConnect: boolean;
  videoCodecs: string;
  mediaRegion: string;
  url: string;
  participants: string;
  recordings: string;
  channelUniqueName: number;
  channel: IChannel;
}

export interface IConnectRoomResponse {
  room: ICreateRoomResponse;
  errors: IConnectionError[];
}

export interface Room {
  sid: string;
  uniqueName: number;
  friendlyName: string;
  participantsCount: number;
  activeParticipantsCount: number;
  status: string;
  dateUpdated: string;
  channelSid: string;
  channelUniqueName: string;
  lastCheck: string;
  isNew: boolean;
  isOwn: boolean;
}

export interface IGetRoomsResponse {
  data: Room[];
  error: ErrorCode;
  status: number;
  lastCheck: string;
}
