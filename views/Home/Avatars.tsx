import React from 'react';
import {WebView} from 'react-native-webview';

const Avatars = () => {
  return (
    <WebView
      style={{flex: 1}}
      source={{
        uri: 'https://stellar-intern-programme.github.io/SWGMMMA/avatars/',
      }}
    />
  );
};

export default Avatars;
