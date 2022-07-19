import {connect} from 'react-redux';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

import {
  codeRegister as codeRegisterConnect,
  defaultState as defaultStateConnect,
} from '../../src/actions/authActions';
import {StyleSheet, View, Text, ActivityIndicator, Image} from 'react-native';
import useFormHandler from '../../src/hooks/useFormHandler';
import {server} from '../../src/config';
import {AuthPropsReducer} from '@typings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackArrow from '../../src/components/Auth/BackArrow';
import TextField from '../../src/components/Auth/TextField';
import Button from '../../src/components/Auth/Button';

const Code = ({
  loggedIn,
  codeRegister,
  serverErrors,
  defaultState,
  navigation,
  route,
}: Omit<
  AuthPropsReducer,
  'completeForgotPassword' | 'login' | 'register' | 'forgotPassword' | 'loading'
>) => {
  const [startLoad, setStartLoad] = useState(false);

  const {values, errors, setField, verifyValidity, setError} = useFormHandler(
    {code: ''},
    serverErrors,
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    defaultState({});
  }, [defaultState]);

  const onSuccess = async ({authToken}: {authToken: string}) => {
    await AsyncStorage.setItem('auth-token', authToken);
    navigation.navigate('Home');
  };

  const onFinish = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (loggedIn && route.name === 'Code') {
      return navigation.navigate('Home');
    }

    const verifyValidityURL = async () => {
      try {
        const authToken = await AsyncStorage.getItem('auth-token');
        await axios.post(
          `${server}/api/authentication/register/complete/verify/${route.params.url_param}`,
          {},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${authToken};`,
            },
          },
        );
      } catch (err) {
        navigation.navigate('Register');
      }
      setStartLoad(true);
    };
    verifyValidityURL();
  }, [route.params.url_param, loggedIn, route.name, navigation]);

  const registerCompleteRequest = async () => {
    setError('fullError', '');
    if (verifyValidity()) return;

    try {
      setLoading(true);

      await codeRegister({
        code: values.code,
        onSuccess,
        dummyToken: await AsyncStorage.getItem('dummyToken'),
        onFinish,
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (!startLoad) return null;
  return (
    <View style={styles.container}>
      <BackArrow />
      <Text style={styles.headline}>Enter Code</Text>
      <Text style={styles.help}>
        You have just received a message on your email account. Check it out and
        enter the code in it below &#40;code is available for 2 minutes&#41;
      </Text>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658139046/IFrameApplication/mail-1008_qzkqjj.png',
        }}
        style={{width: 128, height: 128}}
      />
      <TextField
        placeholder={'123456...'}
        value={values.code}
        name={'code'}
        setField={setField}
        label={'Code'}
        error={errors?.code || errors?.fullError || ''}
      />

      {!loading ? (
        <Button
          customStyles={{marginTop: 50}}
          text={'Continue'}
          onPress={registerCompleteRequest}
        />
      ) : (
        <ActivityIndicator
          color={'#1A73E8'}
          size={'large'}
          style={{marginTop: 50}}
        />
      )}
    </View>
  );
};

export default connect(
  (state: any) => ({
    loggedIn: state.auth.loggedIn,
    serverErrors: state.auth.errors,
  }),
  {codeRegister: codeRegisterConnect, defaultState: defaultStateConnect},
)(Code);

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  headline: {
    fontFamily: 'Inter',
    color: 'white',
    fontWeight: '900',
    fontSize: 50,
    marginTop: -10,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  containerSent: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  sentImage: {
    width: 140,
    height: 140,
  },
  textImage: {
    fontSize: 30,
    fontFamily: 'Inter',
    fontWeight: '900',
    color: 'white',
    width: 200,
    textAlign: 'center',
    marginTop: 20,
  },
  help: {
    fontSize: 15,
    color: 'rgb(200, 200, 200)',
    width: '80%',
    textAlign: 'center',
    marginBottom: 50,
  },
});
