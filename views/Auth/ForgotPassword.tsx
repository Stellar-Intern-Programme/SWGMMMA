import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import useFormHandler from '../../src/hooks/useFormHandler';
import {forgotPassword, defaultState} from '../../src/actions/authActions';
import {AuthPropsReducer} from '../../src/typings';
import TextField from '../../src/components/Auth/TextField';
import Button from '../../src/components/Auth/Button';
import BackArrow from '../../src/components/Auth/BackArrow';

const ForgotPassword = ({
  serverErrors,
  forgotPassword,
  loading,
  defaultState,
}: Omit<
  AuthPropsReducer,
  | 'completeForgotPassword'
  | 'register'
  | 'codeRegister'
  | 'login'
  | 'navigation'
  | 'route'
>) => {
  const [sent, setSent] = useState(false);

  const {values, errors, setError, setField, verifyValidity} = useFormHandler(
    {email: ''},
    serverErrors,
  );

  useEffect(() => {
    defaultState({});
  }, [defaultState]);

  const onSuccess = () => {
    setSent(true);
  };

  const forgotPassRequest = async () => {
    setError('fullName', '');

    verifyValidity();

    if (errors?.email?.length > 0) return;

    await forgotPassword({email: values.email, onSuccess});
  };

  const sendBack = () => {};

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
  {forgotPassword, defaultState},
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
