import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordDone from './ForgotPasswordDone';

const Auth = createStackNavigator();

const AuthStack: React.FC = () => (
  <Auth.Navigator initialRouteName="Login" headerMode="none">
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="Signup" component={Signup} />
    <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
    <Auth.Screen name="ForgotPasswordDone" component={ForgotPasswordDone} />
  </Auth.Navigator>
);

export default AuthStack;
