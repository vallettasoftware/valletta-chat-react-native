import React from 'react';
import { Text, ImageSourcePropType, View, Image } from 'react-native';

import { styles } from './styles';
import { IModal } from '../../../../../../store/models/common/Modal';

interface ITextFormProps {
  modal: IModal;
  image?: ImageSourcePropType;
}

export const TextForm = ({ modal, image }: ITextFormProps) => {
  return (
    <View>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={image} />
        </View>
      )}
      {modal.subTitle && <Text style={[styles.text, styles.lightGreenTittle]}>{modal.subTitle}</Text>}
      <Text style={[styles.text, styles.whiteText]}>{modal.text}</Text>
    </View>
  );
};
