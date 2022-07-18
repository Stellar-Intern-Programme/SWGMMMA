import Login from '../../views/Auth/Login';
import Register from '../../views/Auth/Register';
import ForgotPassword from '../../views/Auth/ForgotPassword';
import FrontDesign from '../../views/Layout/FrontDesign';
import Code from '../../views/Auth/Code';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const AuthRoot = ({loggedIn}: {loggedIn: boolean}) => {
  const Stack = createNativeStackNavigator();

  return !loggedIn ? (
    <Stack.Navigator
      initialRouteName={'FrontDesign'}
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
    </Stack.Navigator>
  ) : (
    <></>
  );
};

export default connect(
  (state: any) => ({loggedIn: state.auth.loggedIn}),
  {},
)(AuthRoot);

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#1D1D1D',
    position: 'relative',
    boxSizing: 'border-box',
  },
});
