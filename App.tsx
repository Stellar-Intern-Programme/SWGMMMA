import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import configureStore from './src/store/configureStore';
// import HomeRoot from './src/routes/HomeRoot';
// import AuthRoot from './src/routes/AuthRoot';
import AuthComponent from './views/AuthComponent';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import ForgotPassword from './views/Auth/ForgotPassword';
import FrontDesign from './views/Layout/FrontDesign';
import Code from './views/Auth/Code';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const App = () => {
  const {store} = configureStore();
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <AuthComponent>
        <NavigationContainer>
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
          {/*<HomeRoot />*/}
          {/*<AuthRoot />*/}
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
