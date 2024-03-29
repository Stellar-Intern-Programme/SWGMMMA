declare module 'intersection-observer';
declare module 'react-native-animated-loader';

export interface TextMessage {
  text: string;
  date: string;
  index: 1 | 2;
  senderEmail: string;
  time: string;
  media?: string;
  seen?: string;
  setImage: any;
  setSenderEmailFP: any;
  contentOffset: number;
  offset: number;
}

export type Section = 'Messages' | 'Social' | 'None';

export interface AuthPropsReducer {
  loggedIn: boolean;
  loading: boolean;
  serverErrors: {
    email: string;
    password: string;
    username: string;
    code: string;
    confirmPassword: string;
    fullError: string;
  };
  navigation: any;
  route: any;
  loginSuccess: any;
  defaultState: (dispatch: any) => void;
  login: (dispatch: any) => Promise<void>;
  register: (dispatch: any) => Promise<void>;
  codeRegister: (dispatch: any) => Promise<void>;
  forgotPassword: (dispatch: any) => Promise<void>;
  completeForgotPassword: (dispatch: any) => Promise<void>;
}

export interface FormHandler {
  values: {
    email: string;
    password: string;
    username: string;
    code: string;
    confirmPassword: string;
  };
  errors: {
    email: string;
    password: string;
    username: string;
    code: string;
    confirmPassword: string;
    fullError: string;
    both: string;
  };
  setField: (name: string, newValue: string) => void;
  setError: (name: string, newValue: string) => void;
  verifyValidity: () => boolean;
}

export type initialValues = {
  initialValues: {
    email: string;
    password: string;
    username: string;
    code: string;
    confirmPassword: string;
  };
};

export interface MessageContainerProps {
  mcRef: any;
  nrMessages: any;
  nrMessagesLoadings: any;
  lastMessages: any;
  scrollRef: any;
  myUsername: string;
  seeMessage: any;
  getInitialMessages: any;
  getPreviousMessages: any;
  _messages: any;
  _total: any;
  conversationId: string;
  myEmail: string;
  userId: string;
  newContainer: boolean;
  addNotReadyMessage: any;
  blocked: boolean;
  route: any;
  conversations: any;
}

export interface CreateMessageProps {
  conversationId: string;
  userId: string;
  addNotReadyMessage: any;
  myEmail: string;
  scrollRef: any;
  nrMessages: any;
  blocked: boolean;
  nrMessagesLoadings: any;
}

export interface MessSectionProps {
  person?: any;
  message: string;
  conversationId: string;
  totalUnseen: number;
  imageUrl: string;
  navigation?: any;
  time?: string;
  scrollRef: any;
  media: boolean;
}

export interface SocialRedux {
  peopleSearch: any;
  updateFriends: any;
  psLoading: boolean;
  loading: boolean;
  friends: any;
  showPeopleSearch: any;
  resetPeopleSearch: any;
  showFriendRequests: any;
  friendRequests: any;
}

export interface useSearchProps {
  initialData: any;
  search: string;
  properties: string[];
}
