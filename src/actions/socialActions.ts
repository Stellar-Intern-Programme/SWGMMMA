import axios from 'axios';

import {SOCIAL_ACTIONS} from '../reducers/socialReducer';
import {server} from '../config/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteSocialData = () => (dispatch: any) => {
  dispatch({
    type: SOCIAL_ACTIONS.DELETE_DATA,
  });
};

export const updateFriends = () => async (dispatch: any) => {
  dispatch({
    type: SOCIAL_ACTIONS.START_LOADING,
  });

  try {
    const result = (
      await axios.get(`${server}/api/social/show-friends`, {
        withCredentials: true,
        headers: {
          Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
        },
      })
    ).data;

    dispatch({
      type: SOCIAL_ACTIONS.FRIENDS,
      payload: {friends: result.friends},
    });
  } catch (err) {
    console.log(err);
  }

  dispatch({
    type: SOCIAL_ACTIONS.STOP_LOADING,
  });
};

export const defaultState = () => async (dispatch: any) => {
  dispatch({
    type: SOCIAL_ACTIONS.DEFAULT_STATE,
  });
};

export const addFriend =
  ({email, onSuccess}: {email: string; onSuccess: () => void}) =>
  async () => {
    try {
      await axios.post(
        `${server}/api/social/add-friend`,
        {email},
        {
          withCredentials: true,
          headers: {
            Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
          },
        },
      );

      onSuccess();
      updateFriends();
    } catch (err) {
      console.log(err);
    }
  };

export const removeFriend =
  ({
    email,
    remFrCallback,
    onRemoveFriend,
  }: {
    onRemoveFriend: any;
    email: string;
    remFrCallback: ({conversationId}: {conversationId: string}) => void;
  }) =>
  async (dispatch: any) => {
    try {
      const result = (
        await axios.post(
          `${server}/api/social/remove-friend`,
          {email},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          },
        )
      ).data;

      dispatch({
        type: SOCIAL_ACTIONS.REMOVE_FRIEND,
        payload: {email},
      });

      onRemoveFriend({conversationId: result.conversationId});

      remFrCallback({conversationId: result.conversationId});
    } catch (err) {
      console.log(err);
    }
  };

export const showFriendRequests = () => async (dispatch: any) => {
  dispatch({
    type: SOCIAL_ACTIONS.START_LOADING,
  });

  try {
    const result = (
      await axios.get(`${server}/api/social/show-friend-requests`, {
        withCredentials: true,
        headers: {
          Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
        },
      })
    ).data;

    dispatch({
      type: SOCIAL_ACTIONS.GET_FRIEND_REQUESTS,
      payload: {friendRequests: result.friendRequests},
    });
  } catch (err) {
    console.log(err);
  }

  dispatch({
    type: SOCIAL_ACTIONS.STOP_LOADING,
  });
};

export const acceptFriendRequest =
  ({
    email,
    onSuccess,
    acceptedRequestCallback,
  }: {
    email: string;
    onSuccess: () => void;
    acceptedRequestCallback: any;
  }) =>
  async () => {
    try {
      const result = (
        await axios.post(
          `${server}/api/social/accept-request`,
          {email},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          },
        )
      ).data;

      onSuccess();
      updateFriends();

      acceptedRequestCallback({conversation: result.conversation});
    } catch (err) {
      console.log(err);
    }
  };

export const rejectFriendRequest =
  ({email, onSuccess}: {email: string; onSuccess: () => void}) =>
  async () => {
    try {
      await axios.post(
        `${server}/api/social/reject-request`,
        {email},
        {
          withCredentials: true,
          headers: {
            Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
          },
        },
      );

      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };

export const showPeopleSearch =
  ({email}: {email: string}) =>
  async (dispatch: any) => {
    dispatch({
      type: SOCIAL_ACTIONS.PEOPLE_SEARCH_START_LOADING,
    });

    try {
      const result = (
        await axios.post(
          `${server}/api/social/show-people`,
          {email},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          },
        )
      ).data;

      dispatch({
        type: SOCIAL_ACTIONS.PEOPLE_SEARCH_STOP_LOADING,
      });

      dispatch({
        type: SOCIAL_ACTIONS.SHOW_PEOPLE_SEARCH,
        payload: {people: result.value},
      });
    } catch (err) {
      console.log(err);
    }

    dispatch({
      type: SOCIAL_ACTIONS.PEOPLE_SEARCH_STOP_LOADING,
    });
  };

export const resetPeopleSearch = () => (dispatch: any) => {
  dispatch({
    type: SOCIAL_ACTIONS.RESET_PEOPLE_SEARCH,
  });
};

export const blockFriend =
  ({
    email,
    onSuccess,
    friendId,
  }: {
    email: string;
    onSuccess: any;
    friendId: string;
  }) =>
  async (dispatch: any) => {
    try {
      const result = (
        await axios.post(
          `${server}/api/social/block-friend`,
          {email},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          },
        )
      ).data;

      dispatch({
        type: SOCIAL_ACTIONS.BLOCK_SITUATION,
        payload: {friendId},
      });

      onSuccess({conversationId: result.id, convStatus: result.convStatus});
    } catch (err) {
      console.log(err);
    }
  };

export const unblockFriend =
  ({
    email,
    onSuccess,
    friendId,
  }: {
    email: string;
    onSuccess: any;
    friendId: string;
  }) =>
  async (dispatch: any) => {
    try {
      const result = (
        await axios.post(
          `${server}/api/social/unblock-friend`,
          {email},
          {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          },
        )
      ).data;

      dispatch({
        type: SOCIAL_ACTIONS.BLOCK_SITUATION,
        payload: {friendId},
      });

      onSuccess({conversationId: result.id, convStatus: result.convStatus});
    } catch (err) {
      console.log(err);
    }
  };
