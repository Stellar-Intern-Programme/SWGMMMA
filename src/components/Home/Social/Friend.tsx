import React, {useState, FC} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';

import {
  blockFriend as blockFriendConnect,
  unblockFriend as unblockFriendConnect,
  removeFriend as removeFriendConnect,
} from '../../../actions/socialActions';
import {
  removeConversation as removeConversationConnect,
  statusConversation as statusConversationConnect,
} from '../../../actions/conversationActions';
import {useSocket} from '../../../hooks/useSocket';

interface Item {
  name: string;
  email: string;
  pfp: string | undefined;
  blocked: boolean;
  friendId: string;
  blockFriend: (dispatch: any) => void;
  unblockFriend: (dispatch: any) => void;
  removeFriend: (dispatch: any) => void;
  removeConversation: any;
  statusConversation: any;
}

const Friend: FC<Item> = ({
  friendId,
  name,
  email,
  blocked,
  blockFriend,
  unblockFriend,
  removeFriend,
  removeConversation,
  statusConversation,
  pfp,
}) => {
  const [loading, setLoading] = useState(false);

  const socket = useSocket();

  const onFinish = () => {
    setLoading(false);
  };

  const onSuccess = ({
    conversationId,
    convStatus,
  }: {
    conversationId: string;
    convStatus: boolean;
  }) => {
    const onSocket = () => {
      socket!.sendConversationStatus({conversationId, convStatus});
    };

    statusConversation({conversationId, convStatus, onSocket});
  };

  const remFrCallback = ({conversationId}: {conversationId: string}) => {
    removeConversation({conversationId});
  };

  const block = (e: any) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      blockFriend({email, onSuccess, friendId, onFinish});
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const unblock = async (e: any) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      unblockFriend({email, onSuccess, friendId, onFinish});
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onRemoveFriend = ({conversationId}: {conversationId: string}) => {
    socket!.removeConversation({conversationId});
  };

  const remove = (e: any) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      removeFriend({email, remFrCallback, onRemoveFriend, onFinish});
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  console.log(pfp);
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
          {email}
        </Text>
      </ScrollView>
      {!loading ? (
        <View style={styles.buttonContainer}>
          {!blocked ? (
            <Pressable style={styles.buttonPos} onPress={block}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658699589/IFrameApplication/Group_25_tyaluk.png',
                }}
                fadeDuration={0}
                style={styles.button}
              />
            </Pressable>
          ) : (
            <Pressable style={styles.buttonPos} onPress={unblock}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658700669/IFrameApplication/user_c44bvf.png',
                }}
                fadeDuration={0}
                style={styles.button}
              />
            </Pressable>
          )}
          <Pressable style={styles.buttonPos} onPress={remove}>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658699588/IFrameApplication/Group_24_udgvim.png',
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
  blockFriend: blockFriendConnect,
  unblockFriend: unblockFriendConnect,
  removeFriend: removeFriendConnect,
  removeConversation: removeConversationConnect,
  statusConversation: statusConversationConnect,
})(Friend);

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
    position: 'relative',
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 16,
    color: 'white',
    overflow: 'visible',
    paddingBottom: 10,
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
