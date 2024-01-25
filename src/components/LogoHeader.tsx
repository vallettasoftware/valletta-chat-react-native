import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

type Props = {
  title: string;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 75,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 29,
    marginBottom: 45,
    marginTop: 23,
    textAlign: 'center',
  },
});

const LogoHeader: React.FC<Props> = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default LogoHeader;
