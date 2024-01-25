import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../localization/en.json';
import ru from '../localization/ru.json';

enum LangsEnum {
  EN = 'en',
  RU = 'ru',
}

const LANG_STORAGE_KEY = 'LANG_STORAGE_KEY';

// select current language
i18n.translations = { en, ru };
AsyncStorage.getItem(LANG_STORAGE_KEY).then((loc) => {
  i18n.locale = loc || LangsEnum.EN;
});

export const { t } = i18n;
