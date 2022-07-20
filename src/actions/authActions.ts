import axios from 'axios';

import {AUTH_ACTIONS} from '../reducers/authReducer';
import {server} from '../config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const verifyLogin = (authToken: string) => async (dispatch: any) => {
  try {
    const result = (
      await axios.post(
        `${server}/api/miscellaneous/isAuthenticated`,
        {},
        {
          withCredentials: true,
          headers: {Cookie: `auth-token=${authToken || ''};`},
        },
      )
    ).data;

    dispatch({
      type: AUTH_ACTIONS.LOGGED_IN,
      payload: {name: result.username, email: result.email, id: result.userId},
    });
  } catch (err: any) {
    dispatch({
      type: AUTH_ACTIONS.NOT_LOGGED_IN,
    });
    if (err && err.response && err.response.data && err.response.data.err) {
      console.log(err.response.data.err);
    } else console.log(err);
  }
};

export const defaultState = () => (dispatch: any) => {
  dispatch({
    type: AUTH_ACTIONS.DEFAULT_STATE,
  });
};

export const logout =
  ({onSuccess}: {onSuccess: () => void}) =>
  (dispatch: any) => {
    dispatch({
      type: AUTH_ACTIONS.LOGOUT,
    });

    onSuccess();
  };

export const login =
  ({
    email,
    password,
    onSuccess,
    authToken,
    onFinish,
  }: {
    email: string;
    password: string;
    onSuccess: any;
    authToken: string;
    onFinish: () => void;
  }) =>
  async (dispatch: any) => {
    const data = {email, password, authToken};

    try {
      const result = (
        await axios.post(`${server}/api/authentication/login`, data, {
          withCredentials: true,
          headers: {
            Cookie: `auth-token=${authToken || ''};`,
          },
        })
      ).data;

      dispatch({
        type: AUTH_ACTIONS.LOG_IN_SUCCESS,
        payload: {result},
      });

      onSuccess({authToken: result.authToken});

      return;
    } catch (err: any) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.type &&
        err.response.data.type === 'email' &&
        err.response.data.message
      ) {
        dispatch({
          type: AUTH_ACTIONS.LOG_IN_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'email',
          },
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.type &&
        err.response.data.type === 'password' &&
        err.response.data.message
      ) {
        dispatch({
          type: AUTH_ACTIONS.LOG_IN_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'password',
          },
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.type &&
        err.response.data.type === 'both' &&
        err.response.data.message
      ) {
        dispatch({
          type: AUTH_ACTIONS.LOG_IN_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'both',
          },
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        dispatch({
          type: AUTH_ACTIONS.LOG_IN_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'fullError',
          },
        });
      }

      if (err && err.response && err.response.data && err.response.data.err) {
        console.log(err.response.data.err);
      } else console.log(err);
    }

    onFinish();
  };

export const register =
  ({
    email,
    password,
    username,
    onSuccess,
    authToken,
    onFinish,
  }: {
    email: string;
    password: string;
    username: string;
    onSuccess: (param: string, dummyToken: string) => void;
    authToken: string;
    onFinish: () => void;
  }) =>
  async (dispatch: any) => {
    const data = {email, password, username};

    try {
      const result = (
        await axios.post(`${server}/api/authentication/register`, data, {
          withCredentials: true,
          headers: {
            Cookie: `auth-token=${authToken || ''};`,
          },
        })
      ).data;

      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: {loading: false, uniqueUrl: result.uniqueParam},
      });

      onSuccess(result.uniqueParam, result.dummyCookie);
    } catch (err: any) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.type &&
        err.response.data.type === 'email'
      ) {
        dispatch({
          type: AUTH_ACTIONS.REGISTER_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'email',
          },
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.type &&
        err.response.data.type === 'password'
      ) {
        dispatch({
          type: AUTH_ACTIONS.REGISTER_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'password',
          },
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.type &&
        err.response.data.type === 'username'
      ) {
        dispatch({
          type: AUTH_ACTIONS.REGISTER_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'username',
          },
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        dispatch({
          type: AUTH_ACTIONS.REGISTER_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'fullError',
          },
        });
      }

      if (err && err.response && err.response.data && err.response.data.err) {
        console.log(err.response.data.err);
      } else console.log(err);
    }

    onFinish();
  };

export const codeRegister =
  ({
    code,
    onSuccess,
    dummyToken,
    onFinish,
  }: {
    code: string;
    onSuccess: ({authToken}: {authToken: string}) => void;
    dummyToken: string;
    onFinish: () => void;
  }) =>
  async (dispatch: any) => {
    try {
      const result = (
        await axios.post(
          `${server}/api/authentication/register/complete`,
          {code},
          {
            withCredentials: true,
            headers: {
              Cookie: `dummy-cookie=${dummyToken};`,
            },
          },
        )
      ).data;

      dispatch({
        type: AUTH_ACTIONS.CODE_REGISTER_SUCCESS,
        payload: {email: result.email, name: result.name, id: result.id},
      });

      onSuccess({authToken: result.authToken});

      return;
    } catch (err: any) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.type &&
        err.response.data.type === 'code'
      ) {
        dispatch({
          type: AUTH_ACTIONS.CODE_REGISTER_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'code',
          },
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        dispatch({
          type: AUTH_ACTIONS.CODE_REGISTER_FAIL,
          payload: {
            loading: false,
            error: err.response.data.message,
            name: 'fullError',
          },
        });
      }

      if (err && err.response && err.response.data && err.response.data.err) {
        console.log(err.response.data.err);
      } else console.log(err);
    }

    onFinish();
  };

export const forgotPassword =
  ({
    email,
    onSuccess,
    onFinish,
  }: {
    email: string;
    onSuccess: () => void;
    onFinish: () => void;
  }) =>
  async (dispatch: any) => {
    try {
      await axios.post(
        `${server}/api/authentication/forgot-password`,
        {email},
        {
          withCredentials: true,
          headers: {
            Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
          },
        },
      );

      dispatch({
        type: AUTH_ACTIONS.FP_SUCCESS,
      });

      onSuccess();

      return;
    } catch (err: any) {
      dispatch({
        type: AUTH_ACTIONS.FP_FAIL,
        payload: {error: err.response.data.message, name: 'email'},
      });
      if (err && err.response && err.response.data && err.response.data.err) {
        console.log(err.response.data.err);
      } else console.log(err);
    }

    onFinish();
  };

export const completeForgotPassword =
  ({
    password,
    confirmPassword,
    unique_url,
    onSuccess,
    onPageFail,
    onFinish,
  }: {
    password: string;
    confirmPassword: string;
    unique_url: string;
    onSuccess: () => void;
    onPageFail: () => void;
    onFinish: () => void;
  }) =>
  async (dispatch: any) => {
    try {
      await axios.post(
        `${server}/api/authentication/forgot-password/change/${unique_url}`,
        {password, confirmPassword},
        {
          withCredentials: true,
          headers: {
            Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
          },
        },
      );

      dispatch({
        type: AUTH_ACTIONS.FP_SUCCESS,
      });

      onSuccess();

      return;
    } catch (err: any) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.type &&
        err.response.data.type === 'password'
      ) {
        dispatch({
          type: AUTH_ACTIONS.FP_FAIL,
          payload: {error: err.response.data.message, name: 'password'},
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.type &&
        err.response.data.type === 'confirmPassword'
      ) {
        dispatch({
          type: AUTH_ACTIONS.FP_FAIL,
          payload: {error: err.response.data.message, name: 'confirmPassword'},
        });
      } else if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.type &&
        err.response.data.type === 'page'
      ) {
        onPageFail();

        return;
      } else {
        dispatch({
          type: AUTH_ACTIONS.FP_FAIL,
          payload: {error: err.response.data.message, name: 'fullError'},
        });
      }
      if (err && err.response && err.response.data && err.response.data.err) {
        console.log(err.response.data.err);
      } else console.log(err);
    }

    onFinish();
  };
