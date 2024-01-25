import axios from '../../../../axios.config';
import { TypeToken } from '../../../common/typeToken';
import store from '../../../store';

export class TokenProvider {
  public static async getToken(roomName: string, tokenTypes: TypeToken): Promise<string> {
    const { token } = store.getState().user;
    const body = { tokenTypes, roomName };
    try {
      const { data } = await axios.post<string>(`api/Twilio/generate-token`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
}
