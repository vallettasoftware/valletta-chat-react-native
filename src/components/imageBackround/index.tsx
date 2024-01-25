import React, { FC, PropsWithChildren } from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';

import { styles } from './styles';

interface ISharpDevBackground {
  image?: ImageSourcePropType;
}

export const SharpDevBackground: FC<ISharpDevBackground> = (props: PropsWithChildren<ISharpDevBackground>) => {
  const { image, children } = props;

  return (
    <ImageBackground source={image ?? require('../../assets/background.jpg')} style={styles.imageBackground}>
      {children}
    </ImageBackground>
  );
};
