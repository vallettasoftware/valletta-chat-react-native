import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import { Badge } from 'native-base';
import { styles } from './styles';

type Props = {
  title: {
    enable: string;
    disable?: string;
  };
  enable?: boolean;
  icon: string;
  onPress: () => void;
  params?: {
    participants?: number;
    hasNewMessages?: boolean;
  };
  disabled?: boolean;
};

const VerticalButton: React.FC<Props> = ({ title, enable, icon, onPress, params, disabled = false }: Props) => {
  const getIcon = () => {
    switch (icon) {
      case 'Mic':
        return enable ? (
          <Image source={require('../../../../assets/icons/Mic.png')} style={disabled && styles.disabled} />
        ) : (
          <Image source={require('../../../../assets/icons/noun_Mic.png')} style={disabled && styles.disabled} />
        );
      case 'Webcam':
        return enable ? (
          <Image source={require('../../../../assets/icons/Webcam.png')} style={disabled && styles.disabled} />
        ) : (
          <Image source={require('../../../../assets/icons/noun_Webcam.png')} style={disabled && styles.disabled} />
        );
      case 'Participants': {
        return (
          <View style={styles.relativeWrapper}>
            <Image source={require('../../../../assets/icons/Group.png')} style={disabled && styles.disabled} />
            <Badge success style={styles.badge}>
              <Text style={styles.text}>{params?.participants}</Text>
            </Badge>
          </View>
        );
      }
      case 'Chat':
        return (
          <View style={styles.relativeWrapper}>
            <Image source={require('../../../../assets/icons/Chat.png')} />
            {params?.hasNewMessages && <Badge success style={styles.chatBadge} />}
          </View>
        );
      case 'Leave':
        return <Image source={require('../../../../assets/icons/Leave.png')} />;
      default:
        return <View />;
    }
  };

  const getTitle = () => {
    if (enable) {
      return enable ? title.enable : title.disable;
    }
    return title.enable;
  };
  return (
    <TouchableHighlight style={styles.wrapper} onPress={onPress} disabled={disabled}>
      <View style={styles.button}>
        {getIcon()}
        <Text style={styles.text}>{getTitle()}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default VerticalButton;
