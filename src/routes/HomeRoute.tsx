import Avatars from '../../views/Home/Avatars';
import Movies from '../../views/Home/Movies';
import Music from '../../views/Home/Music';
import Quotes from '../../views/Home/Quotes';
import Conversation from '../../views/Home/Messages/Conversation';
import Conversations from '../../views/Home/Conversations';
import Friends from '../../views/Home/Messages/Friends';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabBar from '../components/Home/TabBar';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ConversationsTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Conversations'}
      screenOptions={{
        headerShown: false,
        header: () => null,
      }}>
      <Stack.Screen name="Conversations" component={Conversations} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="Friends" component={Friends} />
    </Stack.Navigator>
  );
};

const HomeRoute = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#0C0C0C'},
      }}
      sceneContainerStyle={styles.tabContainer}
      tabBar={TabBar}>
      <Tab.Screen name={'Home'} component={ConversationsTab} />
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
