import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import authReducer from './authReducer';
import socialReducer from './socialReducer';
import conversationReducer from './conversationReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const socialPersistConfig = {
  key: 'social',
  storage: AsyncStorage,
};

const authPersist = persistReducer(authPersistConfig, authReducer);

const socialPersist = persistReducer(socialPersistConfig, socialReducer);

const rootReducer = combineReducers({
  auth: authPersist,
  social: socialPersist,
  conversation: conversationReducer,
});

export default rootReducer;
