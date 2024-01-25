import { Toast } from 'native-base';

export * from './errorTypes';

export const BASE_URL = 'https://jonquil-manatee-1105.twil.io';
export const ORIGIN_URL = 'https://ngtwilliochat.stage.sharp-dev.net';

type Props = {
  message: string;
  onClose: () => void;
};

export const showToast: (props: Props) => void = ({ message, onClose }: Props) => {
  Toast.show({
    text: message,
    buttonText: 'Ok',
    position: 'bottom',
    type: 'danger',
    onClose,
    duration: 3000,
  });
};

export type Inputs = {
  example: string;
  exampleRequired: string;
};
