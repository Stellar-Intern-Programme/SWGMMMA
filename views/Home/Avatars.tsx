import React, {useState, useEffect, useRef} from 'react';
import {WebView} from 'react-native-webview';
import LoadingPage from '../../src/components/Home/WebView/LoadingPage';
import ErrorPage from '../../src/components/Home/WebView/ErrorPage';
import axios from 'axios';
import {server} from '../../src/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {modifyPfp as modifyPfpConnect} from '../../src/actions/authActions';
import {connect} from 'react-redux';

const Avatars = ({modifyPfp}: {modifyPfp: (img: string) => void}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webView = useRef<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const _avatar = (
          await axios.get(`${server}/api/profile/get-avatar`, {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          })
        ).data.avatar;

        webView.current.postMessage(JSON.stringify(_avatar));
      } catch (err: any) {
        console.log(err.response);
      }
    };
    if (webView.current) {
      getData();
    }
  }, [webView, loading]);

  const onMessage = async (avatar: any, type: string) => {
    try {
      if (type === 'add') {
        modifyPfp(avatar);
        await axios.post(
          `${server}/api/profile/set-avatar`,
          {avatar},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          },
        );
      } else if (type === 'delete') {
        await axios.post(
          `${server}/api/profile/remove-avatar`,
          {},
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
          uri: 'https://stellar-intern-programme.github.io/SWGMMMA/avatars/',
        }}
        ref={webView}
        javaScriptEnabled={true}
        onMessage={event => {
          onMessage(
            JSON.parse(event.nativeEvent.data)[0],
            JSON.parse(event.nativeEvent.data)[1],
          );
          console.log(
            JSON.parse(event.nativeEvent.data)[0].toString(),
            JSON.parse(event.nativeEvent.data)[1],
          );
        }}
      />
      {loading && <LoadingPage />}
      {error && <ErrorPage />}
    </>
  );
};

export default connect((state: any) => ({}), {modifyPfp: modifyPfpConnect})(
  Avatars,
);
