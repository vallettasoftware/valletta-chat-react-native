import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageService, { MessageServiceEvents } from '../../features/Chat/services/messageService';
import { RootState } from '../index';
import { disconnectActionType } from '../utils/actions';
import Sound from 'react-native-sound';
import { ChatService } from './../../features/Chat/services/chatService';

const soundNote = require('../../assets/audio/sound-02.mp3');

Sound.setCategory('Playback');
const ring = new Sound(soundNote, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

const prefix = 'conference/messages';
export interface Message {
  authorEmail: string;
  authorName: string;
  message: string;
  dateUtc: Date;
}

type messagesState = {
  messages: Message[];
  isUnreadMessages: boolean;
  lastMessageIndex?: number;
};

type ConnectChatData = {
  twilioToken: string;
  channelUniqueName: string;
};

const initialState: messagesState = {
  messages: [],
  isUnreadMessages: false,
  lastMessageIndex: undefined,
};

export const sendNewTextMessage = createAsyncThunk(
  `${prefix}/sendNewTextMessage`,
  async (
    data: {
      channelUniqueName: number;
      message: string;
    }
  ) => {
    try {
      await ChatService.sendNewMessage(data);
    } catch (error) {
      console.log(error);
    }
  },
);

export const getCurrentTextChat = createAsyncThunk<Message[], string>(`${prefix}/getTextChat`, async (uniqueName) => {
  try {
    const response = await ChatService.getCurrentTextChat(uniqueName);
    return response;
  } catch (error) {
    console.log(error);
  }
})

export const messagesSlice = createSlice({
  name: prefix,
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = state.messages.concat(action.payload);
    },
    setLastMessageIndex: (state, action) => {
      state.lastMessageIndex = action.payload;
    },
    toggleUnread: (state, action) => {
      state.isUnreadMessages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(disconnectActionType, (state, action) => initialState);
    builder.addCase(getCurrentTextChat.fulfilled, (state, action) => {
      state.messages = action.payload;
    })
  }
});

export const { setMessages, addMessage, toggleUnread, setLastMessageIndex } = messagesSlice.actions;

export const subscribeOnChat = createAsyncThunk<void, void>(`${prefix}/subscribe`, (unused, { dispatch, getState }) => {
  messageService.on(MessageServiceEvents.connection, (channel) => {
    channel?.on('messageAdded', (message: Message) => {
      console.log('message = ', message);
      ring.play();
      const { mySpeakerId } = (getState() as RootState).conferenceData;
      const { channelUniqueName } = (getState() as RootState).conferenceData.roomInfo;

      dispatch(setLastMessageIndex(messageService.getLastMessageIndex() + 1));
      if (channelUniqueName) {
        dispatch(getCurrentTextChat(channelUniqueName))
      }
      dispatch(toggleUnread(true));
    });
    channel?.on('userSubscribed', () => console.log('User subscribed'));
    channel?.on('channelLeft', () => console.log('Channel left'));
  });
});

export const initTextChat = createAsyncThunk<void, ConnectChatData>(
  `${prefix}/init`,
  async ({ twilioToken, channelUniqueName }, { dispatch }) => {
    try {
      await messageService.initChat(twilioToken, channelUniqueName);
      if (messageService.channel) {
        dispatch(setLastMessageIndex(messageService.channel.lastMessage.index));
        subscribeOnChat();
        dispatch(getCurrentTextChat(channelUniqueName))
      }
    } catch (e) {
      console.log('initTextChat error = ', e);
    }
  },
);

export default messagesSlice.reducer;
