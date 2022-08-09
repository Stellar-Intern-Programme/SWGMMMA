import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import LoadingPage from '../../src/components/Home/WebView/LoadingPage';
import ErrorPage from '../../src/components/Home/WebView/ErrorPage';
import axios from 'axios';

const Avatars = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const INJECTED_JAVASCRIPT = `function setAvatar() {
      window.ReactNativeWebView.postMessage(JSON.stringify({key : "value"}));
  };`;

  return (
    <>
      <WebView
        style={{flex: 1, display: loading ? 'none' : 'flex'}}
        onLoadEnd={() => setLoading(false)}
        onError={() => setError(true)}
        source={{
          uri: 'https://stellar-intern-programme.github.io/SWGMMMA/avatars/',
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={event => {
          console.log(event.nativeEvent.data);
        }}
      />
      {loading && <LoadingPage />}
      {error && <ErrorPage />}
    </>
  );
};

export default Avatars;
