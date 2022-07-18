import React, {useEffect} from 'react';
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
} from '../../src/actions/authActions';
import {AuthPropsReducer} from '../../src/typings';
import TextField from '../../src/components/Auth/TextField';
import Button from '../../src/components/Auth/Button';

export type RootStackParamList = {
  ForgotPassword: {id: string};
  Register: {id: string};
};

const Register = ({
  serverErrors,
  login,
  loading,
  defaultState,
}: Omit<
  AuthPropsReducer,
  | 'completeForgotPassword'
  | 'register'
  | 'codeRegister'
  | 'forgotPassword'
  | 'navigation'
  | 'route'
>) => {
  const {values, errors, setField, verifyValidity, setError} = useFormHandler(
    {email: '', password: ''},
    serverErrors,
  );

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    defaultState({});
  }, [defaultState]);

  const onSuccess = async ({authToken}: {authToken: string}) => {
    await AsyncStorage.setItem('auth-token', authToken);
  };

  const loginRequest = async () => {
    setError('fullError', '');

    verifyValidity();

    if (errors?.email?.length > 0 || errors?.password?.length > 0) return;

    try {
      const authToken = await AsyncStorage.getItem('auth-token');

      await login({
        email: values.email,
        password: values.password,
        onSuccess,
        authToken,
      });
    } catch (err) {
      loading = false;
      console.log(err);
    }
  };

  const goToAnotherScreen = (name: 'Register' | 'ForgotPassword') => {
    console.log(name);
    navigation.navigate(name, {id: name});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>LOGIN</Text>
      <TextField
        placeholder={'exemplu@gmail.com'}
        value={values.email}
        name={'email'}
        setField={setField}
        label={'email'}
        error={errors?.email}
      />
      <TextField
        placeholder={'********'}
        value={values.password}
        name={'password'}
        setField={setField}
        label={'Password'}
        error={errors?.password}
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
    loading: state.auth.loading,
  }),
  {login: loginConnect, defaultState: defaultStateConnect},
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
