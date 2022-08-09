import {connect} from 'react-redux';
import React, {useState, FC} from 'react';
import {
  acceptFriendRequest as acceptFriendRequestConnect,
  rejectFriendRequest as rejectFriendRequestConnect,
  showFriendRequests as showFriendRequestsConnect,
} from '../../../actions/socialActions';
import {addConversation as addConversationConnect} from '../../../actions/conversationActions';
import {useSocket} from '../../../hooks/useSocket';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface Props {
  name: string;
  email: string;
  pfp: string;
  acceptFriendRequest: (dispatch: any) => void;
  rejectFriendRequest: (dispatch: any) => void;
  showFriendRequests: (dispatch: any) => void;
  setFriendRequests: (dispatch?: any) => void;
  addConversation: any;
}

const Request: FC<Props> = ({
  name,
  pfp,
  email,
  acceptFriendRequest,
  rejectFriendRequest,
  showFriendRequests,
  setFriendRequests,
  addConversation,
}) => {
  const [loading, setLoading] = useState(false);

  const socket = useSocket();

  const onFinish = () => {
    setLoading(false);
  };

  const onSuccess = () => {
    showFriendRequests({});
    setFriendRequests((friendRequests: any) =>
      friendRequests.filter((fr: any) => fr.email !== email),
    );
  };

  const acceptedRequestCallback = ({conversation}: {conversation: any}) => {
    const onAdded = () => {
      socket!.addNewConversation({conversation});
    };

    addConversation({conversation, onAdded});
  };

  const accept = (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      acceptFriendRequest({
        email,
        onSuccess,
        acceptedRequestCallback,
        onFinish,
      });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const reject = (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      rejectFriendRequest({email, onSuccess, onFinish});
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: pfp,
        }}
        fadeDuration={0}
        style={styles.img}
      />

      <ScrollView
        horizontal={true}
        style={{
          backgroundColor: 'rgba(99, 99, 99, 0)',
          marginRight: !loading ? 0 : 20,
        }}>
        <Text style={styles.text} numberOfLines={1}>
          {name} ({email})
        </Text>
      </ScrollView>
      {!loading ? (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonPos} onPress={accept}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658710595/MessagingApp/check-symbol-4794_tgxsq8.png',
              }}
              fadeDuration={0}
              style={styles.button}
            />
          </Pressable>
          <Pressable style={styles.buttonPos} onPress={reject}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658710594/MessagingApp/error-10379_zw8i7a.png',
              }}
              fadeDuration={0}
              style={styles.button}
            />
          </Pressable>
        </View>
      ) : (
        <ActivityIndicator color={'#1A73E8'} size={'large'} />
      )}
    </View>
  );
};

export default connect(() => ({}), {
  acceptFriendRequest: acceptFriendRequestConnect,
  rejectFriendRequest: rejectFriendRequestConnect,
  showFriendRequests: showFriendRequestsConnect,
  addConversation: addConversationConnect,
})(Request);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#414141',
    height: 84,
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
  },
  img: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(100, 100, 100)',
    borderRadius: 50,
    marginRight: 25,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 16,
    color: 'white',
    overflow: 'visible',
    paddingBottom: 10,
    minWidth: 150,
    top: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    left: 20,
  },
  buttonPos: {
    marginRight: 20,
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
});
