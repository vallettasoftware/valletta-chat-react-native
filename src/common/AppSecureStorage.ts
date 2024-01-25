import * as SecureStore from 'expo-secure-store';
import SharpTalksModal from '../features/Chat/components/modalOption';

export enum storageKeys {
  EMAIL = 'EMAIL',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  TOKEN = 'TOKEN',
}

type StorageKeys = keyof typeof storageKeys;

export class AppSecureStorage {
  private static handleError(e: Error) {
    SharpTalksModal.showError(e);
  }

  private static iterate(callback: (key: string) => unknown) {
    return Object.keys(storageKeys).map(callback);
  }

  public static getAll() {
    return Promise.all(
      AppSecureStorage.iterate(async (key) => {
        return SecureStore.getItemAsync(key);
      }),
    );
  }

  public static async clearStorage() {
    try {
      await Promise.all(
        AppSecureStorage.iterate(async (key) => {
          return SecureStore.deleteItemAsync(key);
        }),
      );
    } catch (e) {
      AppSecureStorage.handleError(e);
    }
  }

  static set(key: StorageKeys, value: string) {
    return SecureStore.setItemAsync(key, value).catch(AppSecureStorage.handleError);
  }

  static get(key: StorageKeys) {
    return SecureStore.getItemAsync(key).catch(AppSecureStorage.handleError);
  }
}
