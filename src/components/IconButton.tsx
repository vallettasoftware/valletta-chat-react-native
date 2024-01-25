import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

type Props = {
  title?: string;
  icon: 'Share' | 'Clipboard';
  propStyles?: any;
  onPress: () => void;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: '#384D61',
    borderRadius: 6,
    flexDirection: 'row',
    height: 36,
  },
  text: {
    color: '#A8B5C1',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    marginLeft: 20,
  },
});
const IconButton: React.FC<Props> = ({ title, icon, propStyles, onPress, disabled = false }: Props) => {
  return (
    <TouchableHighlight onPress={onPress} disabled={disabled} underlayColor="transparent">
      <View style={[styles.buttonWrapper, { ...propStyles }]}>
        {icon === 'Share' ? (
          <Image source={require('../assets/icons/Share.png')} />
        ) : (
          <Image source={require('../assets/icons/Clipboard.png')} />
        )}
        {title && <Text style={styles.text}>{title}</Text>}
      </View>
    </TouchableHighlight>
  );
};

export default IconButton;
