export interface IParticipantConfig {
  participantSid: string;
  videoTrackSid: string;
  isAudioEnabled?: boolean;
  isVideoEnabled?: boolean;
  isRemote: boolean;
  email: string;
  name: string;
  [key: string]: boolean | string | undefined;
}

export interface IMenuParticipants {
  name: string;
  isAudioEnabled?: boolean;
  picture?: string;
}

export interface IParsedParticipant {
  name: string;
  email: string;
  userAgent: string;
}
