import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const Movies = () => {
  return (
    <WebView
      style={{flex: 1}}
      source={{
        uri: 'https://stellar-intern-programme.github.io/SWGMMMA/movies/',
      }}
    />
  );
};

export default Movies;
