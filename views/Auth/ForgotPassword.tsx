import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import useFormHandler from '../../src/hooks/useFormHandler';
import {
  forgotPassword as forgotPasswordConnect,
  defaultState as defaultStateConnect,
} from '../../src/actions/authActions';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthPropsReducer} from '../../src/typings';
import TextField from '../../src/components/Auth/TextField';
import Button from '../../src/components/Auth/Button';
import BackArrow from '../../src/components/Auth/BackArrow';

type RootStackParamList = {
  Login: {id: string};
};

const ForgotPassword = ({
  serverErrors,
  forgotPassword,
  defaultState,
}: Omit<
  AuthPropsReducer,
  | 'completeForgotPassword'
  | 'register'
  | 'codeRegister'
  | 'login'
  | 'navigation'
  | 'route'
  | 'loading'
  | 'loginSuccess'
>) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {values, errors, setError, setField, verifyValidity} = useFormHandler(
    {email: ''},
    serverErrors,
  );

  useEffect(() => {
    defaultState({});
  }, [defaultState]);

  const onSuccess = () => {
    setSent(true);
    setLoading(false);
  };

  const onFinish = () => {
    setLoading(false);
  };

  const forgotPassRequest = async () => {
    setError('fullName', '');
    console.log('pass');
    if (verifyValidity()) return;

    try {
      setLoading(true);

      await forgotPassword({email: values.email, onSuccess, onFinish});
    } catch (err) {
      console.log(err);
    }
  };

  const sendBack = () => {
    navigation.navigate('Login', {id: 'Login'});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackArrow />
      <Text style={styles.headline_no_bottom}>Forgot</Text>
      <Text style={styles.headline}>Password</Text>
      {!sent ? (
        <>
          <TextField
            placeholder={'exemplu@gmail.com'}
            value={values.email}
            name={'email'}
            setField={setField}
            label={'Email'}
            error={errors?.email}
          />

          {!loading ? (
            <Button
              customStyles={{marginTop: 50}}
              text={'Continue'}
              onPress={forgotPassRequest}
            />
          ) : (
            <ActivityIndicator
              color={'#1A73E8'}
              size={'large'}
              style={{marginTop: 40}}
            />
          )}
        </>
      ) : (
        <View style={styles.containerSent}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658139046/IFrameApplication/mail-1008_qzkqjj.png',
            }}
            style={styles.sentImage}
          />
          <Text style={styles.textImage}>An email has been sent</Text>
          <Button
            customStyles={{marginTop: 50}}
            text={'Continue'}
            onPress={sendBack}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default connect(
  (state: any) => ({
    loggedIn: state.auth.loggedIn,
    serverErrors: state.auth.errors,
    loading: state.auth.loading,
  }),
  {forgotPassword: forgotPasswordConnect, defaultState: defaultStateConnect},
)(ForgotPassword);

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  headline_no_bottom: {
    fontFamily: 'Inter',
    color: 'white',
    fontWeight: '900',
    fontSize: 50,
    textTransform: 'uppercase',
  },
  headline: {
    fontFamily: 'Inter',
    color: 'white',
    fontWeight: '900',
    fontSize: 50,
    marginTop: -10,
    marginBottom: 40,
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
});
