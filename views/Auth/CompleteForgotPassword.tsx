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
  completeForgotPassword as completeForgotPasswordConnect,
  defaultState as defaultStateConnect,
} from '../../src/actions/authActions';
import {AuthPropsReducer} from '../../src/typings';
import TextField from '../../src/components/Auth/TextField';
import Button from '../../src/components/Auth/Button';
import BackArrow from '../../src/components/Auth/BackArrow';

const CompleteForgotPassword = ({
  serverErrors,
  completeForgotPassword,
  defaultState,
  route,
}: Omit<
  AuthPropsReducer,
  | 'forgotPassword'
  | 'register'
  | 'codeRegister'
  | 'login'
  | 'navigation'
  | 'loading'
  | 'loginSuccess'
>) => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {values, errors, setError, setField, verifyValidity} = useFormHandler(
    {password: '', confirmPassword: ''},
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

  const completeForgotPassReq = async () => {
    setError('fullName', '');
    if (verifyValidity()) return;

    try {
      setLoading(true);

      await completeForgotPassword({
        password: values.password,
        confirmPassword: values.confirmPassword,
        onSuccess,
        unique_url: route.params.unique_url,
        onFinish,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const sendBack = () => {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackArrow />
      <Text style={styles.headline_no_bottom}>Change</Text>
      <Text style={styles.headline}>Password</Text>
      {!sent ? (
        <>
          <TextField
            placeholder={'abcd123...'}
            value={values.email}
            name={'password'}
            setField={setField}
            label={'Password'}
            error={errors?.email}
            loading={loading}
          />

          <TextField
            placeholder={'abcd123...'}
            value={values.email}
            name={'confirmPassword'}
            setField={setField}
            label={'Confirm Password'}
            error={errors?.email}
            loading={loading}
          />

          {!loading ? (
            <Button
              customStyles={{marginTop: 10}}
              text={'Continue'}
              onPress={completeForgotPassReq}
            />
          ) : (
            <ActivityIndicator color={'#1A73E8'} size={'large'} />
          )}
        </>
      ) : (
        <View style={styles.containerChanged}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658215686/IFrameApplication/quality-3601_dub2sh.png',
            }}
            style={styles.sentImage}
          />
          <Text style={styles.textImage}>Successfully changed password</Text>
          <Button
            customStyles={{marginTop: 10}}
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
  }),
  {
    completeForgotPassword: completeForgotPasswordConnect,
    defaultState: defaultStateConnect,
  },
)(CompleteForgotPassword);

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
  containerChanged: {
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
