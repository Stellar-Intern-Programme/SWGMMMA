import React, {useEffect, useState, useRef} from 'react';
import {WebView} from 'react-native-webview';
import LoadingPage from '../../src/components/Home/WebView/LoadingPage';
import ErrorPage from '../../src/components/Home/WebView/ErrorPage';
import axios from 'axios';
import {server} from '../../src/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webView = useRef<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const _movies = (
          await axios.get(`${server}/api/profile/get-movies`, {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          })
        ).data.movies;

        webView.current.postMessage(JSON.stringify(_movies));
      } catch (err: any) {
        console.log(err.response);
      }
    };
    if (webView.current) {
      getData();
    }
  }, [webView, loading]);

  const onMessage = async (movie: any, type: string) => {
    try {
      if (type === 'add') {
        await axios.post(
          `${server}/api/profile/add-movie`,
          {movie},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          },
        );
      } else if (type === 'delete') {
        await axios.post(
          `${server}/api/profile/remove-movie`,
          {movie},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          },
        );
      }
    } catch (err: any) {
      console.log(err.response);
    }
  };

  return (
    <>
      <WebView
        style={{flex: 1, display: loading ? 'none' : 'flex'}}
        onLoadEnd={() => setLoading(false)}
        onError={() => setError(true)}
        cacheMode={'LOAD_NO_CACHE'}
        cacheEnabled={false}
        source={{
          uri: 'https://stellar-intern-programme.github.io/SWGMMMA/movies/',
        }}
        ref={webView}
        javaScriptEnabled={true}
        onMessage={event => {
          onMessage(
            JSON.parse(event.nativeEvent.data)[0],
            JSON.parse(event.nativeEvent.data)[1],
          );
        }}
      />
      {loading && <LoadingPage />}
      {error && <ErrorPage />}
    </>
  );
};

export default Movies;
