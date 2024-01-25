import React from 'react';
import { View, Image, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import { RootState } from '../../../../store';
import { toggleActiveView } from '../../../../store/conference/data';
import { t } from '../../../../common/i18n';
import { styles } from './styles';

type Props = {
  toggleOpen: () => void;
};

const Header: React.FC<Props> = ({ toggleOpen }: Props) => {
  const route = useRoute();
  const isMenuOpen = useIsDrawerOpen();
  const { camera } = useSelector((state: RootState) => state.conferenceData.settings);
  const { isSpeakerView } = useSelector((state: RootState) => state.conferenceData);
  const dispatch = useDispatch();

  const menuIcon = isMenuOpen
    ? require('../../../../assets/icons/CloseSideMenu.png')
    : require('../../../../assets/icons/Hamburger_menu.png');

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image source={require('../../../../assets/small_logo.png')} style={styles.image} />
      </View>

      {route.name !== 'Main' && (
        <TouchableHighlight
          style={[styles.speakerView, !camera && styles.disabled, isSpeakerView && styles.activeView]}
          disabled={!camera}
          onPress={() => dispatch(toggleActiveView({}))}
        >
          <View style={styles.button}>
            <Image source={require('../../../../assets/icons/View.png')} style={styles.viewImage} />
            <Text style={styles.text}>{t('MAIN.HEADER.SPEAKER_VIEW')}</Text>
          </View>
        </TouchableHighlight>
      )}

      <TouchableHighlight onPress={toggleOpen}>
        <Image source={menuIcon} style={styles.menuIcon} />
      </TouchableHighlight>
    </View>
  );
};

export default Header;
