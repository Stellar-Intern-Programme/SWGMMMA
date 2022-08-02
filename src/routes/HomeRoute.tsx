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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddFriends from '../../views/Home/Social/AddFriends';
import Requests from '../../views/Home/Social/Requests';
import Profile from '../../views/Home/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ConversationsTab = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        header: () => null,
        contentStyle: {backgroundColor: '#1D1D1D'},
      }}>
      <Stack.Screen name="Home" component={HomeRoute} />
      <Stack.Screen name="Conversation" component={Conversation} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="AddFriends" component={AddFriends} />
      <Stack.Screen name="Requests" component={Requests} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const HomeRoute = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Conversations'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0C0C0C',
        },
        tabBarHideOnKeyboard: true,
      }}
      sceneContainerStyle={styles.tabContainer}
      tabBar={TabBar}>
      <Tab.Screen name={'Conversations'} component={Conversations} />
      <Tab.Screen name={'Avatars'} component={Avatars} />
      <Tab.Screen name={'Movies'} component={Movies} />
      <Tab.Screen name={'Music'} component={Music} />
      <Tab.Screen name={'Quotes'} component={Quotes} />
    </Tab.Navigator>
  );
};

export default ConversationsTab;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#1D1D1D',
  },
});
