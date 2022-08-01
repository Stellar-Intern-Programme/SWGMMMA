import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {
  NavigationContainer,
  createNavigationContainerRef,
  useNavigationContainerRef,
} from '@react-navigation/native';
import configureStore from './src/store/configureStore';
import RootRoute from './src/routes/RootRoute';
import AuthComponent from './views/AuthComponent';
import {StyleSheet, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {SingletonHooksContainer} from 'react-singleton-hook';

const App = () => {
  const {store} = configureStore();

  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <Provider store={store}>
      <SingletonHooksContainer />
      <AuthComponent>
        <NavigationContainer>
          <RootRoute />
        </NavigationContainer>
      </AuthComponent>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#1D1D1D',
    position: 'relative',
    boxSizing: 'border-box',
  },
});
