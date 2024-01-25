import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatService } from '../../features/Chat/services/chatService';
import { TokenProvider } from '../../features/Chat/services/tokenProvider';
import { TypeToken } from '../../common/typeToken';
import { initTextChat } from './messages';
import { StatusConnection } from '../../features/Chat/enums/statusConnection';
import { setChannelUniqueName, setStatus, setRoomInfo } from './data';
import videoRef from '../../common/VideoRef';
import { RootState } from '../index';

export type ConnectData = {
  email: string;
  uniqueName: string;
};

const prefix = 'conference';

export const connectToRoom = createAsyncThunk<void, ConnectData>(
  `${prefix}/connect`,
  async (params, { dispatch, getState, rejectWithValue }) => {
    try {
      const { room } = await ChatService.connectToRoom(+params.uniqueName);
      dispatch(setRoomInfo(room));
      const channelUniqueName = room.channel.uniqueName.toString();
      dispatch(setChannelUniqueName(channelUniqueName));
      const { isAudioEnabled: enableAudio, isVideoEnabled: enableVideo } = (getState() as RootState).conferenceData;

      if (videoRef.isConnected() && params?.email) {
        videoRef.disconnect();
        const token = await TokenProvider.getToken(params.uniqueName, TypeToken.BOTH);
        videoRef.connect(token, params.uniqueName, enableAudio, enableVideo);
        dispatch(initTextChat({ twilioToken: token, channelUniqueName })).then(() =>
          dispatch(setStatus(StatusConnection.CONNECTED)),
        );
      }
    } catch (e) {
      console.log('connectToRoom error = ', e);
      rejectWithValue(e);
    }
  },
);
