import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import LoadingPage from '../../src/components/Home/WebView/LoadingPage';
import ErrorPage from '../../src/components/Home/WebView/ErrorPage';

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  return (
    <>
      <WebView
        style={{flex: 1, display: loading ? 'none' : 'flex'}}
        onLoadEnd={() => setLoading(false)}
        onError={() => setError(true)}
        source={{
          uri: 'https://stellar-intern-programme.github.io/SWGMMMA/movies/',
        }}
      />
      {loading && <LoadingPage />}
      {error && <ErrorPage />}
    </>
  );
};

export default Movies;
