import axios from 'axios';

import {AUTH_ACTIONS} from '../reducers/authReducer';
import {server} from '../config/index';

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
    console.log(err.response.data.err);
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
  }: {
    email: string;
    password: string;
    onSuccess: any;
    authToken: string;
  }) =>
  async (dispatch: any) => {
    dispatch({
      type: AUTH_ACTIONS.START_LOADING,
    });

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

      console.log(err.response.data.err);
    }

    dispatch({
      type: AUTH_ACTIONS.STOP_LOADING,
      payload: {loading: false},
    });
  };

export const register =
  ({
    email,
    password,
    username,
    onSuccess,
    authToken,
  }: {
    email: string;
    password: string;
    username: string;
    onSuccess: (param: string, dummyToken: string) => void;
    authToken: string;
  }) =>
  async (dispatch: any) => {
    dispatch({
      type: AUTH_ACTIONS.START_LOADING,
    });

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

      dispatch({
        type: AUTH_ACTIONS.STOP_LOADING,
      });
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

      console.log(err.response.data.err);
    }
    dispatch({
      type: AUTH_ACTIONS.STOP_LOADING,
    });
  };

export const codeRegister =
  ({
    code,
    onSuccess,
    dummyToken,
  }: {
    code: string;
    onSuccess: ({authToken}: {authToken: string}) => void;
    dummyToken: string;
  }) =>
  async (dispatch: any) => {
    dispatch({
      type: AUTH_ACTIONS.START_LOADING,
    });

    try {
      const result = (
        await axios.post(
          `${server}/api/authentication/register/complete`,
          {code},
          {
            withCredentials: true,
            headers: {
              Cookie: `dummy-cookie=${dummyToken};`,
              Authorization: `Bearer ${dummyToken}`,
            },
          },
        )
      ).data;

      dispatch({
        type: AUTH_ACTIONS.CODE_REGISTER_SUCCESS,
        payload: {loading: false, loggedIn: true},
      });

      dispatch({
        type: AUTH_ACTIONS.STOP_LOADING,
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

      console.log(err.response.data.err);
    }

    dispatch({
      type: AUTH_ACTIONS.STOP_LOADING,
    });
  };

export const forgotPassword =
  ({email, onSuccess}: {email: string; onSuccess: () => void}) =>
  async (dispatch: any) => {
    dispatch({
      type: AUTH_ACTIONS.START_LOADING,
    });

    try {
      await axios.post(
        `${server}/api/authentication/forgot-password`,
        {email},
        {withCredentials: true},
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
      console.log(err.response.data.err);
    }

    dispatch({
      type: AUTH_ACTIONS.STOP_LOADING,
    });
  };

export const completeForgotPassword =
  ({
    password,
    confirmPassword,
    unique_url,
    onSuccess,
    onPageFail,
  }: {
    password: string;
    confirmPassword: string;
    unique_url: string;
    onSuccess: () => void;
    onPageFail: () => void;
  }) =>
  async (dispatch: any) => {
    dispatch({
      type: AUTH_ACTIONS.START_LOADING,
    });

    try {
      await axios.post(
        `${server}/api/authentication/forgot-password/change/${unique_url}`,
        {password, confirmPassword},
        {withCredentials: true},
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
        dispatch({
          type: AUTH_ACTIONS.STOP_LOADING,
        });

        onPageFail();

        return;
      } else {
        dispatch({
          type: AUTH_ACTIONS.FP_FAIL,
          payload: {error: err.response.data.message, name: 'fullError'},
        });
      }
      console.log(err.response.data.err);
    }

    dispatch({
      type: AUTH_ACTIONS.STOP_LOADING,
    });
  };
