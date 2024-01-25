import { IMenuParticipants } from './Participants';

interface ISettingsMenu {
  name: 'Settings';
}

interface IParticipantsMenu {
  name: 'Participants';
  participants: IMenuParticipants[];
  uniqueName: number;
}

interface IMessagesMenu {
  name: 'Messages';
}

interface IConferenceSettingsMenu {
  name: 'ConferenceSettings';
}

export type IMenuComponent = ISettingsMenu | IParticipantsMenu | IMessagesMenu | IConferenceSettingsMenu;
