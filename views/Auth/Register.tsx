import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import useFormHandler from '../../src/hooks/useFormHandler';
import {
  register as registerConnect,
  defaultState as defaultStateConnect,
} from '../../src/actions/authActions';
import {AuthPropsReducer} from '../../src/typings';
import TextField from '../../src/components/Auth/TextField';
import Button from '../../src/components/Auth/Button';
import BackArrow from '../../src/components/Auth/BackArrow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Code: {url_param: string};
};

const Register = ({
  serverErrors,
  register,
  defaultState,
}: Omit<
  AuthPropsReducer,
  | 'completeForgotPassword'
  | 'login'
  | 'codeRegister'
  | 'forgotPassword'
  | 'route'
  | 'navigation'
  | 'loading'
  | 'loginSuccess'
>) => {
  const {values, errors, setField, verifyValidity, setError} = useFormHandler(
    {email: '', password: '', username: ''},
    serverErrors,
  );

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    defaultState({});
  }, [defaultState]);

  const onSuccess = async (url: string, dummyToken: string) => {
    await AsyncStorage.setItem('dummyToken', dummyToken);
    navigation.navigate('Code', {url_param: url});
  };

  const onFinish = () => {
    setLoading(false);
  };

  const registerRequest = async () => {
    setError('fullError', '');
    if (verifyValidity()) return;

    try {
      setLoading(true);

      await register({
        email: values.email,
        password: values.password,
        username: values.username,
        onSuccess,
        authToken: (await AsyncStorage.getItem('auth-token')) || '',
        onFinish,
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <BackArrow />
      <Text style={styles.headline}>REGISTER</Text>
      <TextField
        placeholder={'exemplu@gmail.com'}
        value={values.email}
        name={'email'}
        setField={setField}
        label={'Email'}
        error={errors?.email}
      />
      <TextField
        placeholder={'User...'}
        value={values.username}
        name={'username'}
        setField={setField}
        label={'Username'}
        error={errors?.username}
      />
      <TextField
        placeholder={'*********'}
        value={values.password}
        name={'password'}
        setField={setField}
        label={'Password'}
        error={errors?.password}
      />
      {!loading ? (
        <Button text={'Continue'} onPress={registerRequest} />
      ) : (
        <ActivityIndicator
          color={'#1A73E8'}
          size={'large'}
          style={{marginTop: 40}}
        />
      )}
    </ScrollView>
  );
};

export default connect(
  (state: any) => ({
    loggedIn: state.auth.loggedIn,
    serverErrors: state.auth.errors,
  }),
  {register: registerConnect, defaultState: defaultStateConnect},
)(Register);

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'Inter',
    color: 'white',
    fontWeight: '900',
    fontSize: 50,
    marginBottom: 40,
  },
});
