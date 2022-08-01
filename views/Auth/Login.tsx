import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import useFormHandler from '../../src/hooks/useFormHandler';
import {
  login as loginConnect,
  defaultState as defaultStateConnect,
  loginSuccess as loginSuccessConnect,
} from '../../src/actions/authActions';
import {AuthPropsReducer} from '../../src/typings';
import TextField from '../../src/components/Auth/TextField';
import Button from '../../src/components/Auth/Button';

export type RootStackParamList = {
  ForgotPassword: {id: string};
  Register: {id: string};
  Home: {id: string};
};

const Register = ({
  serverErrors,
  login,
  defaultState,
  loginSuccess,
}: Omit<
  AuthPropsReducer,
  | 'completeForgotPassword'
  | 'register'
  | 'codeRegister'
  | 'forgotPassword'
  | 'navigation'
  | 'route'
  | 'loading'
>) => {
  const {values, errors, setField, verifyValidity, setError} = useFormHandler(
    {email: '', password: ''},
    serverErrors,
  );

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    defaultState({});
  }, []);

  const onSuccess = async ({
    authToken,
    result,
  }: {
    authToken: string;
    result: any;
  }) => {
    await AsyncStorage.setItem('auth-token', authToken);
    loginSuccess({result});
  };

  const onFinish = () => {
    setLoading(false);
  };

  const loginRequest = async () => {
    setError('fullError', '');

    if (verifyValidity()) return;

    try {
      setLoading(true);

      const authToken = await AsyncStorage.getItem('auth-token');

      await login({
        email: values.email,
        password: values.password,
        onSuccess,
        authToken,
        onFinish,
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const goToAnotherScreen = (name: 'Register' | 'ForgotPassword') => {
    navigation.navigate(name, {id: name});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>LOGIN</Text>
      <Text style={styles.fullError}>{errors?.fullError}</Text>
      <TextField
        placeholder={'exemplu@gmail.com'}
        value={values.email}
        name={'email'}
        setField={setField}
        label={'email'}
        error={errors?.email}
        loading={loading}
      />
      <TextField
        placeholder={'********'}
        value={values.password}
        name={'password'}
        setField={setField}
        label={'Password'}
        error={errors?.password}
        loading={loading}
      />

      {!loading ? (
        <Button text={'Continue'} onPress={loginRequest} />
      ) : (
        <ActivityIndicator
          color={'#1A73E8'}
          size={'large'}
          style={{marginTop: 40}}
        />
      )}
      <Text style={styles.helpText}>or</Text>

      <Pressable onPress={() => goToAnotherScreen('Register')}>
        <Text style={styles.changeMethod}>Register</Text>
      </Pressable>

      <Pressable
        style={styles.forgotPassLinkPos}
        onPress={() => goToAnotherScreen('ForgotPassword')}>
        <Text style={styles.forgotPassLink}>Forgot Password</Text>
      </Pressable>
    </ScrollView>
  );
};

export default connect(
  (state: any) => ({
    loggedIn: state.auth.loggedIn,
    serverErrors: state.auth.errors,
  }),
  {
    login: loginConnect,
    defaultState: defaultStateConnect,
    loginSuccess: loginSuccessConnect,
  },
)(Register);

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    marginTop: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLeftArrow: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 55,
    left: 20,
  },
  headline: {
    fontFamily: 'Inter',
    color: 'white',
    fontWeight: '900',
    fontSize: 50,
  },
  fullError: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: 'red',
    marginBottom: 40,
  },
  signUpButton: {
    width: 340,
    paddingVertical: 20,
    backgroundColor: '#1A73E8',
    borderRadius: 7,
    marginTop: 40,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
  },
  helpText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: '#B7B6B6',
    marginTop: 20,
  },
  changeMethod: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  forgotPassLink: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    fontWeight: '900',
  },
  forgotPassLinkPos: {
    position: 'absolute',
    bottom: 40,
  },
});
