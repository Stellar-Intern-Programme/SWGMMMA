import Home from '../../views/Home/Home';
import Avatars from '../../views/Home/Avatars';
import Movies from '../../views/Home/Movies';
import Music from '../../views/Home/Music';
import Quotes from '../../views/Home/Quotes';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabBar from '../components/Home/TabBar';

const HomeRoute = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#0C0C0C'},
      }}
      sceneContainerStyle={styles.tabContainer}
      tabBar={TabBar}>
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen name={'Avatars'} component={Avatars} />
      <Tab.Screen name={'Movies'} component={Movies} />
      <Tab.Screen name={'Music'} component={Music} />
      <Tab.Screen name={'Quotes'} component={Quotes} />
    </Tab.Navigator>
  );
};

export default HomeRoute;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#1D1D1D',
  },
});
