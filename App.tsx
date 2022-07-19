import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import configureStore from './src/store/configureStore';
import RootRoute from './src/routes/RootRoute';
import AuthComponent from './views/AuthComponent';
import {StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {SingletonHooksContainer} from 'react-singleton-hook';

const App = () => {
  const {store} = configureStore();

  useEffect(() => {
    // SplashScreen.hide();
  }, []);

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
