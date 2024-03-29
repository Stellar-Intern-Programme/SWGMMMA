const INITIAL_STATE = {
  loggedIn: false,
  loading: false,
  username: '',
  pfp: '',
  email: '',
  userId: '',
  errors: {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    fullError: '',
    code: '',
  },
};

export enum AUTH_ACTIONS {
  DEFAULT_STATE = 'DEFAULT_STATE',
  LOGGED_IN = 'LOGGED_IN',
  NOT_LOGGED_IN = 'NOT_LOGGED_IN',
  LOG_IN_FAIL = 'LOG_IN_FAIL',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  REGISTER_FAIL = 'REGISTER_FAIL',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  CODE_REGISTER_FAIL = 'CODE_REGISTER_FAIL',
  CODE_REGISTER_SUCCESS = 'CODE_REGISTER_SUCCESS',
  FP_FAIL = 'FP_FAIL',
  FP_SUCCESS = 'FP_SUCCESS',
  LOGOUT = 'LOGOUT',
  CHANGE_PFP = 'CHANGE_PFP',
}

const reducer: any = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGGED_IN: {
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        email: action.payload.email,
        userId: action.payload.id,
        pfp: action.payload.pfp,
        errors: {
          email: '',
          password: '',
          confirmPassword: '',
          username: '',
          fullError: '',
          code: '',
        },
      };
    }
    case AUTH_ACTIONS.NOT_LOGGED_IN: {
      return {
        ...state,
        loggedIn: false,
        username: '',
        email: '',
        userId: '',
        pfp: 'https://res.cloudinary.com/multimediarog/image/upload/v1658320601/IFrameApplication/ezgif.com-gif-maker_qbz0uj.png',
      };
    }
    case AUTH_ACTIONS.DEFAULT_STATE: {
      return {
        ...state,
        errors: {
          email: '',
          password: '',
          username: '',
          fullError: '',
          code: '',
        },
      };
    }
    case AUTH_ACTIONS.LOGOUT: {
      return {
        loggedIn: false,
        username: '',
        email: '',
        userId: '',
        pfp: 'https://res.cloudinary.com/multimediarog/image/upload/v1658320601/IFrameApplication/ezgif.com-gif-maker_qbz0uj.png',
      };
    }
    case AUTH_ACTIONS.LOG_IN_FAIL: {
      return {
        ...state,
        loggedIn: false,
        errors: {
          [action.payload.name]: action.payload.error,
        },
      };
    }
    case AUTH_ACTIONS.LOG_IN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        email: action.payload.result.email,
        userId: action.payload.result.id,
        username: action.payload.result.name,
        pfp: action.payload.result.pfp,
      };
    }
    case AUTH_ACTIONS.REGISTER_FAIL: {
      return {
        ...state,
        loggedIn: false,
        errors: {
          [action.payload.name]: action.payload.error,
        },
      };
    }
    case AUTH_ACTIONS.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case AUTH_ACTIONS.CODE_REGISTER_FAIL: {
      return {
        ...state,
        loggedIn: false,
        errors: {
          [action.payload.name]: action.payload.error,
        },
      };
    }
    case AUTH_ACTIONS.CODE_REGISTER_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        email: action.payload.email,
        userId: action.payload.id,
        username: action.payload.name,
        pfp: action.payload.pfp,
      };
    }
    case AUTH_ACTIONS.FP_FAIL: {
      return {
        ...state,
        [action.payload.name]: action.payload.error,
      };
    }
    case AUTH_ACTIONS.FP_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case AUTH_ACTIONS.CHANGE_PFP: {
      return {
        ...state,
        pfp: action.payload.img,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
