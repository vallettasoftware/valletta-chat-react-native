import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title?: string;
  type: 'primary' | 'secondary' | 'transparent';
  onPress: () => void;
  propStyles?: any;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pattern: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },
});

const Button: React.FC<Props> = ({ title, type, onPress, propStyles, disabled = false }: Props) => {
  const background = () => {
    switch (type) {
      case 'primary':
        return '#2A76D5';
      case 'secondary':
        return '#32475A';
      case 'transparent':
        return 'transparent';
      default:
        return '#2A76D5';
    }
  };

  if (type === 'primary')
    return (
      <TouchableHighlight onPress={onPress} style={styles.pattern} disabled={disabled}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[disabled ? 'rgba(42, 118, 213, 0.6)' : '#2A76D5', disabled ? 'rgba(73, 147, 228, 0.6)' : '#4993E4']}
          style={[styles.pattern, { ...propStyles }]}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableHighlight>
    );

  return (
    <TouchableHighlight
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.pattern,
        { ...propStyles },

        {
          backgroundColor: background(),
        },
        type !== 'transparent' && styles.boxShadow,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;
