import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Root } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import { useHeadphonesDetection } from 'react-native-headphone-detection';

import { RouteProp } from '@react-navigation/core';
import store from './src/store/index';
import { setHeadphone } from './src/store/User';
import AuthStack from './src/features/Auth/pages';
import MainStack from './src/features/Chat/pages';
import SharpTalksModal from './src/features/Chat/components/modalOption';
import { linkingOptions } from './src/Navigation';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#04192F',
    flex: 1,
  },
});

type AppListenersContainerProps = {
  route?: RouteProp<any, any>;
};

const AppListenersContainer: React.FC<AppListenersContainerProps> = ({ route }) => {
  const dispatch = useDispatch();
  const headphoneConnection = useHeadphonesDetection();

  const { audioJack, bluetooth } = headphoneConnection;

  useEffect(() => {
    dispatch(setHeadphone(headphoneConnection));
  }, [audioJack, bluetooth]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SharpTalksModal ref={(ref) => SharpTalksModal.setRef(ref)} />
      <NavigationContainer linking={linkingOptions}>
        <Stack.Navigator initialRouteName="Auth" headerMode="none" screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen name="Auth" initialParams={route?.params} component={AuthStack} />
          <Stack.Screen name="Main" initialParams={route?.params} component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const App: () => JSX.Element = () => {
  return (
    <Root>
      <Provider store={store}>
        <AppListenersContainer />
      </Provider>
    </Root>
  );
};

const ConnectedApp = connectActionSheet(App);

const AppContainer = () => {
  return (
    <ActionSheetProvider>
      <ConnectedApp />
    </ActionSheetProvider>
  );
};

export default AppContainer;
