import { Platform, PixelRatio } from 'react-native';

export const normalize = (size: number, width: number) => {
  const scale = width / 320;
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

export const fonts = {
  mini: (width: number) => normalize(12, width),
  small: (width: number) => normalize(15, width),
  medium: (width: number) => normalize(17, width),
  large: (width: number) => normalize(24, width),
};
