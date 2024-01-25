import { createSlice } from '@reduxjs/toolkit';
import { StatusConnection } from '../../features/Chat/enums/statusConnection';
import { IParsedParticipant } from '../models/common/Participants';
import { ICreateRoomResponse } from '../models/responses/Room';
import { disconnectActionType } from '../utils/actions';

const prefix = 'conference/data';

type chatState = {
  isSpeakerView: boolean;
  settings: {
    microphone: boolean;
    camera: boolean;
  };
  localParticipantIdentity?: IParsedParticipant;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  mySpeakerId?: string; // sid
  channelUniqueName?: string;
  status: StatusConnection;
  activeSpeakerId?: string; // sid
  roomInfo: ICreateRoomResponse | null,
  activeParticipantsCount: number
};

const initialState: chatState = {
  isSpeakerView: false,
  isAudioEnabled: true,
  isVideoEnabled: true,
  status: StatusConnection.DISCONNECTED,
  settings: {
    microphone: false,
    camera: false,
  },
  roomInfo: null,
  activeParticipantsCount: 0
};

export const chatSlice = createSlice({
  name: prefix,
  initialState,
  reducers: {
    setIdentity: (state, action) => {
      state.localParticipantIdentity = action.payload;
    },
    setMySpeakerId: (state, action) => {
      state.mySpeakerId = action.payload;
    },
    setVideoEnabled: (state, action) => {
      state.isVideoEnabled = action.payload;
    },
    setAudioEnabled: (state, action) => {
      state.isAudioEnabled = action.payload;
    },
    setChannelUniqueName: (state, action) => {
      state.channelUniqueName = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setActiveSpeaker: (state, action) => {
      state.activeSpeakerId = action.payload;
    },
    setMicrophoneActivity: (state, action) => {
      state.settings.microphone = !state.settings.microphone;
    },
    setCameraActivity: (state, action) => {
      state.settings.camera = action.payload;
    },
    toggleActiveView: (state, action) => {
      state.isSpeakerView = !state.isSpeakerView;
    },
    setRoomInfo: (state, action) => {
      state.roomInfo = action.payload;
    },
    setActiveParticipants: (state, action) => {
      state.activeParticipantsCount = action.payload
    }
  },
  extraReducers: {
    [disconnectActionType]: (state, action) => initialState,
  },
});

export const {
  setMySpeakerId,
  setMicrophoneActivity,
  setStatus,
  setIdentity,
  setActiveSpeaker,
  setVideoEnabled,
  setAudioEnabled,
  setCameraActivity,
  toggleActiveView,
  setChannelUniqueName,
  setRoomInfo,
  setActiveParticipants
} = chatSlice.actions;

export default chatSlice.reducer;
