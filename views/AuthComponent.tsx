import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verifyLogin as verifyLoginConnect} from '../src/actions/authActions';

const AuthComponent: ({
  children,
  verifyLogin,
}: {
  children: any;
  verifyLogin: any;
}) => JSX.Element = ({children, verifyLogin}) => {
  useEffect(() => {
    const checkLogin = async () => {
      console.log(await AsyncStorage.getItem('auth-token'));
      verifyLogin({authToken: await AsyncStorage.getItem('auth-token')});
    };

    checkLogin();

    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
};

export default connect(() => ({}), {
  verifyLogin: verifyLoginConnect,
})(AuthComponent);
