import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp,
  useIsDrawerOpen,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import ChangePassword from './ChangePassword';
import MainScreen from './MainScreen';
import DrawerContent from '../components/drawerContent';
import { MainRoutes } from '../../../Navigation';
import { RootState } from '../../../store';
import { toggleUnread } from '../../../store/conference/messages';

const Drawer = createDrawerNavigator();

const DrawerLeft = createDrawerNavigator();

const Main = createStackNavigator();

const style = StyleSheet.create({
  drawer: {
    backgroundColor: '#223343',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    width: Dimensions.get('screen').width - 50,
  },
});

type DrawerProp = DrawerNavigationProp<MainRoutes, 'Main'>;

type Props = {
  navigation: DrawerProp;
  route?: any;
};

const Stack: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const drawerState = useIsDrawerOpen();
  const { menuComponent } = useSelector((state: RootState) => state.main);

  useEffect(() => {
    if (!drawerState && menuComponent.name === 'Messages') {
      dispatch(toggleUnread(false));
    }
  }, [drawerState]);

  return (
    <Main.Navigator headerMode="none">
      <Main.Screen name="Main" component={MainScreen} />
      <Main.Screen name="ResetPassword" component={ChangePassword} />
      <Main.Screen name="Chat" component={Chat} />
    </Main.Navigator>
  );
};

const SubStack = () => {
  return (
    <DrawerLeft.Navigator
      drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
      initialRouteName="SubStack"
      drawerStyle={style.drawer}
      drawerPosition="left"
    >
      <Drawer.Screen name="SubStack" component={Stack} />
    </DrawerLeft.Navigator>
  );
};

const MainStack: React.FC = () => (
  <Drawer.Navigator
    initialRouteName="Container"
    drawerPosition="right"
    drawerContent={(props: DrawerContentComponentProps) => <DrawerContent {...props} />}
    drawerStyle={style.drawer}
  >
    <Drawer.Screen name="Container" component={SubStack} />
  </Drawer.Navigator>
);

export default MainStack;
