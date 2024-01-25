import Client from 'twilio-chat';
import { Channel } from 'twilio-chat/lib/channel';

export enum MessageServiceEvents {
  connection = 'connection',
  disconnect = 'disconnect',
}

type MessageServiceEvent = keyof typeof MessageServiceEvents;

export class MessageService {
  public client?: Client = undefined;

  public channel?: Channel = undefined;

  private onJoinChat: ((channel: Channel) => void) | undefined;

  private onDisconnect: ((channel: Channel) => void) | undefined;

  on(event: MessageServiceEvent, callback: (service: Channel) => void) {
    switch (event) {
      case MessageServiceEvents.connection:
        this.onJoinChat = callback;
        break;
      case MessageServiceEvents.disconnect:
        this.onDisconnect = callback;
        break;
      default:
        break;
    }
  }

  public initChat = async (token: string, uniqueName: string) => {
    await this.client?.shutdown();

    this.client = await Client.create(token);

    try {
      this.channel = await this.client?.getChannelByUniqueName(uniqueName);
    } catch (err) {
      console.log('<<<----ERROR ', err);
    }
    if (this.channel) {
      try {
        if (this.channel.status !== 'joined') {
          await this.channel.join();
          if (this.onJoinChat) this.onJoinChat(this.channel);
        }
      } catch (error) {
        console.log('<<-- ERROR FROM JOIN CHAT ', error.message);
      }
    }
  };

  getLastMessageIndex() {
    return this.channel?.lastMessage.index || -1;
  }

  public async checkNewMessages() {
    const count = await this.channel?.getUnconsumedMessagesCount();
    if (count !== null) {
      return true;
    }
    return false;
  }

  public sendMessage = (message: string) => {
    this.channel?.sendMessage(message);
  };

  public leaveChannel = () => {
    this.channel?.leave();
    this.client?.user.unsubscribe();
  };
}

const instance = new MessageService();
export default instance;
