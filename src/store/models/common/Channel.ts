export interface IChannel {
  sid: string;
  friendlyName: string;
  uniqueName: number;
  attributes: string;
  type: string;
  dateCreated: string;
  dateUpdated: string;
  createdBy: string;
  membersCount: number;
  messagesCount: number;
  url: string;
  webhooks: string;
  messages: string;
  invites: string;
  members: string;
  lastMessage: string;
}
