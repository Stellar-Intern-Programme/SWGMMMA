import React, {useEffect} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import useFormHandler from '../src/hooks/useFormHandler';
import {register, defaultState} from '../src/actions/authActions';
import {AuthPropsReducer} from '../src/typings';
import TextField from '../src/components/Auth/TextField';
import Button from '../src/components/Auth/Button';

const Register = ({
  serverErrors,
  register,
  loading,
  defaultState,
}: Omit<
  AuthPropsReducer,
  'completeForgotPassword' | 'login' | 'codeRegister' | 'forgotPassword'
>) => {
  const {values, errors, setField, verifyValidity, setError} = useFormHandler(
    {email: '', password: '', username: ''},
    serverErrors,
  );

  useEffect(() => {
    defaultState({});
  }, [defaultState]);

  const onSuccess = (url: string) => {
    console.log(url);
  };

  const registerRequest = async () => {
    setError('fullError', '');

    verifyValidity();

    if (
      errors?.email?.length > 0 ||
      errors?.password?.length > 0 ||
      errors?.username?.length > 0
    )
      return;

    await register({
      email: values.email,
      password: values.password,
      username: values.username,
      onSuccess,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.backLeftArrow}
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1657790812/IFrameApplication/Vector_y46yx3.png',
        }}
      />
      <Text style={styles.headline}>REGISTER</Text>
      <TextField
        placeholder={'exemplu@gmail.com'}
        value={values.email}
        name={'email'}
        setField={setField}
      />
      <TextField
        placeholder={'User...'}
        value={values.username}
        name={'email'}
        setField={setField}
      />
      <TextField
        placeholder={'*********'}
        value={values.email}
        name={'email'}
        setField={setField}
      />
      <Button text={'Continue'} onPress={registerRequest} />
      <View style={styles.authMethods}></View>
    </ScrollView>
  );
};

export default connect(
  (state: any) => ({
    loggedIn: state.auth.loggedIn,
    serverErrors: state.auth.errors,
    loading: state.auth.loading,
  }),
  {register, defaultState},
)(Register);

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
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
  authMethods: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
