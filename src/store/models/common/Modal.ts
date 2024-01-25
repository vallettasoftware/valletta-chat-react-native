import { ActionOption } from '../../../features/Chat/enums/actionOption';
import { t } from '../../../common/i18n';

export interface IModalChat {
  uniqueName: number;
  updateChats: (update: boolean) => void;
}

export interface IModal {
  title: string;
  withActionButton: boolean;
  subTitle?: string;
  text?: string;
}

export interface IModalButton {
  title: string;
  onPress: (funcArguments?: any) => void;
}

export interface ISharpTalksConfiguration {
  action: ActionOption;
  modal: IModal;
  withArguments: boolean;
  button?: IModalButton;
  defaultButtonTitle?: string;
  swapButtons?: boolean;
  shouldClose?: boolean;
  onClose?: () => void;
}

interface ISuccessModal {
  title: string;
  text: string;
}

export const successModalText = {};

export const modalTexts = {
  default: {
    title: t('COMMON.ERRORS.OOOPS'),
    text: t('COMMON.ERRORS.SOMETHING_WENT_WRONG'),
    withActionButton: false,
  },
  longNameError: {
    title: t('COMMON.ERRORS.TOO_LONG_NAME'),
    text: t('COMMON.ERRORS.TOO_LONG_MESSAGE'),
    withActionButton: false,
  },
  delete: {
    title: t('MAIN.MEETINGS.LIST.DELETE_MEETING'),
    text: t('MAIN.MEETINGS.LIST.ARE_YOU_SURE'),
    withActionButton: true,
  },
  invite: {
    title: t('MAIN.MEETINGS.INVITE_PEOPLE'),
    withActionButton: true,
  },
  rename: {
    title: t('MAIN.MEETINGS.LIST.RENAME_ROOM'),
    withActionButton: true,
  },
  notEnoughMoney: {
    title: t('COMMON.ERRORS.NO_MONEY'),
    text: t('MAIN.MEETINGS.JOIN_MEETING.NO_MONEY'),
    withActionButton: false,
  },
  successInvite: {
    title: t('MAIN.MEETINGS.INVITE_PEOPLE'),
    subTitle: t('MAIN.MEETINGS.INVITE_PARTICIPANTS.SUCCESSFULLY_SENT'),
    text: t('MAIN.MEETINGS.INVITE_PARTICIPANTS.WE_HAVE_SENT_INVITATIONS'),
    withActionButton: false,
  },
  meetingInfo: {
    title: t('MAIN.ACTIVE_MEETING.INFO.TITLE'),
    withActionButton: false,
  }
};
