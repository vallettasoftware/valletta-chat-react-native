import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

type Props = {
  closeMenu: () => void;
  title: string;
};

const styles = StyleSheet.create({
  arrow: {
    height: 11.38,
    width: 13,
  },
  arrowWrapper: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    width: 50,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    margin: 0,
  },
  titleWrapper: {
    alignItems: 'center',
    backgroundColor: '#172837',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
});

const SideMenuHeader = ({ closeMenu, title }: Props) => {
  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
      <TouchableHighlight onPress={closeMenu} style={styles.arrowWrapper} underlayColor="#172837">
        <Image source={require('../../../../assets/icons/RightArrow.png')} style={styles.arrow} />
      </TouchableHighlight>
    </View>
  );
};

export default SideMenuHeader;
