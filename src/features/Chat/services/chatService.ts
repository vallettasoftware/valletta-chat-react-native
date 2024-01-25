import axios from '../../../../axios.config';
import { ORIGIN_URL } from '../../../common';
import { ICreateRoomResponse, IGetRoomsResponse, IConnectRoomResponse } from '../../../store/models/responses/Room';
import { BaseService } from '../../../common/baseService';

const BASE_URL = 'api/Twilio';

export class ChatService extends BaseService {
  public static createRoom: (friendlyName: string) => Promise<ICreateRoomResponse> = async (friendlyName: string) => {
    try {
      const { data } = await axios.post<ICreateRoomResponse>(`${BASE_URL}/video/room`, { friendlyName });

      return data;
    } catch (error) {
      throw ChatService.chooseError(error);
    }
  };

  public static async getChats(email: string): Promise<IGetRoomsResponse> {
    const { data } = await axios.get<IGetRoomsResponse>(`${BASE_URL}/user-rooms`, { params: { email } });
    return data;
  }

  public static connectToRoom = async (uniqueName: number, emails?: string[]) => {
    try {
      const { data } = await axios.post<IConnectRoomResponse>(`${BASE_URL}/connect-user`, { uniqueName, emails });

      return data;
    } catch (error) {
      throw ChatService.chooseError(error);
    }
  };

  public static deleteRoom = async (email: string, uniqueName: number) => {
    try {
      await axios.delete(`${BASE_URL}/user-room`, { data: { email, uniqueName } });
    } catch (error) {
      throw ChatService.chooseError(error);
    }
  };

  public static inviteUsers = async (emails: string[], uniqueName: number) => {
    try {
      const response = await axios.post('/api/Twilio/invite', {
        emails,
        uniqueName,
        callbackLink: `${ORIGIN_URL}/meetings/${uniqueName}`,
      });
      return response.status;
    } catch (error) {
      throw ChatService.chooseError(error);
    }
  };

  public static renameMeeting = async (friendlyName: string, uniqueName: number) => {
    try {
      await axios.put(`${BASE_URL}/rename-room`, { friendlyName, uniqueName });
    } catch (error) {
      throw ChatService.chooseError(error);
    }
  };

  public static getCurrentTextChat = async (uniqueName: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/chat%E2%80%8B/messages?channelUniqueName=${uniqueName}`);
      return response.data;
    } catch (error) {
      throw ChatService.chooseError(error);
    }
  }

  public static sendNewMessage = async (data: {channelUniqueName: number; message: string}) => {
    const { channelUniqueName, message } = data;

    try {
      const response = await axios.post(`${BASE_URL}/chat%E2%80%8B/message`, {
        channelUniqueName,
        message,
      });
      return response;
    } catch (error) {
      throw ChatService.chooseError(error);
    }
  }
}
