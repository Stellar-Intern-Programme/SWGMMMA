import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verifyLogin as verifyLoginConnect} from '../src/actions/authActions';
import {useSocket} from '../src/hooks/useSocket';

const AuthComponent: ({
  children,
  verifyLogin,
  userId,
  loggedIn,
}: {
  children: any;
  verifyLogin: any;
  loggedIn: boolean;
  userId: string;
}) => JSX.Element = ({children, verifyLogin, userId, loggedIn}) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const checkLogin = async () => {
      verifyLogin(await AsyncStorage.getItem('auth-token'));
      setLoaded(true);
    };

    checkLogin();

    // eslint-disable-next-line
  }, []);

  const socket = useSocket();

  useEffect(() => {
    if (loggedIn && socket && Boolean(userId.length)) {
      socket!.subscribe({userId});
    }
  }, [loggedIn, userId, socket]);

  return loaded ? <>{children}</> : <></>;
};

export default connect(
  (state: any) => ({loggedIn: state.auth.loggedIn, userId: state.auth.userId}),
  {
    verifyLogin: verifyLoginConnect,
  },
)(AuthComponent);
