import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Button from '../../../components/Button';
import { t } from '../../../common/i18n';

const { height, width } = Dimensions.get('window');

type Props = {
  navigationCb: () => void;
  text: string;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height,
    justifyContent: 'center',
    paddingHorizontal: 18,
    position: 'absolute',
    width,
    zIndex: 2,
  },
  modal: {
    backgroundColor: '#223343',
    borderRadius: 20,
    padding: 30,
  },
  text: { color: '#fff', fontSize: 16, marginBottom: 25, textAlign: 'center' },
});

const ModalWindow: React.FC<Props> = ({ navigationCb, text }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.text}>{text}</Text>
        <Button type="primary" title={t('COMMON.ACTIONS.LOGIN')} onPress={navigationCb} propStyles={{ padding: 19 }} />
      </View>
    </View>
  );
};

export default ModalWindow;
