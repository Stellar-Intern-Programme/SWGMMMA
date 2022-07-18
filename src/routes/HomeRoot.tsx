import Home from '../../views/Home/Home';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';

const HomeRoot = ({loggedIn}: {loggedIn: boolean}) => {
  const Tab = createBottomTabNavigator();

  return loggedIn ? (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name={'Home'} component={Home} />
    </Tab.Navigator>
  ) : (
    <></>
  );
};

export default connect(
  (state: any) => ({loggedIn: state.auth.loggedIn}),
  {},
)(HomeRoot);
