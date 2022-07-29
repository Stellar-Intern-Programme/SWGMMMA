import Login from '../../views/Auth/Login';
import Register from '../../views/Auth/Register';
import ForgotPassword from '../../views/Auth/ForgotPassword';
import FrontDesign from '../../views/Layout/FrontDesign';
import Code from '../../views/Auth/Code';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import CompleteForgotPassword from '../../views/Auth/CompleteForgotPassword';

const AuthRoute = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
        header: () => null,
        contentStyle: styles.sectionContainer,
      }}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Register'} component={Register} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Stack.Screen name={'FrontDesign'} component={FrontDesign} />
      <Stack.Screen name={'Code'} component={Code} />
      <Stack.Screen
        name={'CompleteForgotPassword'}
        component={CompleteForgotPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthRoute;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#1D1D1D',
    position: 'relative',
    boxSizing: 'border-box',
  },
});
