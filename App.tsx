import React from 'react';
import {Provider} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import Register from './views/Register';
import configureStore from './src/store/configureStore';

const App = () => {
  const {store} = configureStore();

  return (
    <Provider store={store}>
      <ScrollView style={styles.sectionContainer}>
        <Register />
      </ScrollView>
    </Provider>
  );
};

//@ts-ignore
const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#1D1D1D',
  },
});

export default App;
