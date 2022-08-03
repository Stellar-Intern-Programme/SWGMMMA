import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import Header from '../../src/components/Home/Header';
import {useSocket} from '../../src/hooks/useSocket';
import {
  receiveMessage as receiveMessageConnect,
  lastMessage,
  seenMessageByOther as seenMessageByOtherConnect,
  getConversations,
  removeConversation as removeConversationConnect,
  addConversation as addConversationConnect,
  deleteConversationData,
  statusConversation as statusConversationConnect,
} from '../../src/actions/conversationActions';
import {logout} from '../../src/actions/authActions';
import {deleteSocialData} from '../../src/actions/socialActions';
import SkeletonMessSection from '../../src/components/Home/Skeletons/SkeletonMessSection';
import MapConversations from '../../src/components/Home/Conversations/MapConversations';
import ConversationSearch from '../../src/components/Home/Search';

const Conversations = ({
  loggedIn,
  username,
  email,
  userId,
  receiveMessage,
  _messages,
  lastMessage,
  lastMessages,
  seenMessageByOther,
  getConversations,
  conversations,
  removeConversation,
  addConversation,
  logout,
  deleteConversationData,
  deleteSocialData,
  statusConversation,
  navigation,
}: {
  statusConversation: any;
  deleteSocialData: any;
  deleteConversationData: any;
  logout: any;
  loggedIn: boolean;
  addConversation: any;
  removeConversation: any;
  conversations: any;
  getConversations: any;
  seenMessageByOther: any;
  lastMessages: any;
  username: string;
  email: string;
  userId: string;
  receiveMessage: any;
  _messages: any;
  lastMessage: any;
  navigation: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [_conversations, setConversations] = useState<any>(null);

  const scrollRef = useRef(null);

  const newestConversations = conversations;

  useEffect(() => {
    if (newestConversations) {
      setConversations(newestConversations);
    }
  }, [newestConversations]);

  const mcRef = useRef<any>(null);

  const onMyMessage = ({senderEmail}: {senderEmail: string}) => {
    if (
      email === senderEmail ||
      (mcRef.current?.scrollTop <
        mcRef.current?.scrollHeight - mcRef.current?.clientHeight + 35 &&
        mcRef.current?.scrollTop >
          mcRef.current?.scrollHeight - mcRef.current?.clientHeight - 35)
    ) {
      setTimeout(
        () => (scrollRef.current as any)?.scrollToEnd({animated: false}),
        0,
      );
    }
  };

  const socket = useSocket();

  const receiveMessageProp = ({
    conversationId,
    message,
    email,
    userId,
    finished,
    id,
    senderEmail,
  }: {
    senderEmail: string;
    finished: boolean;
    id: number;
    email: string;
    conversationId: string;
    message: string;
    userId: string;
  }) => {
    receiveMessage({
      conversationId,
      message,
      userId,
      email,
      onMyMessage,
      finished,
      id,
      senderEmail,
    });
  };

  const seenMessageByOtherProp = ({
    conversationId,
  }: {
    conversationId: string;
  }) => {
    seenMessageByOther({conversationId});
  };

  const removeConversationProp = ({
    conversationId,
  }: {
    conversationId: string;
  }) => {
    removeConversation({conversationId});
  };

  const addConversationProp = ({conversation}: {conversation: any}) => {
    const onAdded = () => {
      socket!.joinRoom({conversation});
    };

    addConversation({conversation, onAdded});
  };

  const statusConversationProps = ({
    conversationId,
    convStatus,
  }: {
    conversationId: string;
    convStatus: boolean;
  }) => {
    statusConversation({conversationId, convStatus});
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (!loggedIn || !Boolean(email.length) || !Boolean(userId)) return;

    lastMessage();

    const initialConversations = async () => {
      console.log('yes');
      setLoading(true);
      const onFinish = () => {
        setLoading(false);
      };

      getConversations({onFinish});
    };

    initialConversations();

    return () => {
      source.cancel();
    };
  }, [loggedIn]);

  useEffect(() => {
    if (!socket) return;
    socket!.eventListeners({
      receiveMessage: receiveMessageProp,
      seenMessageByOther: seenMessageByOtherProp,
      email,
      userId,
      removeConversation: removeConversationProp,
      addConversation: addConversationProp,
      conversationStatus: statusConversationProps,
    });
  }, [socket]);

  const Action = () => {
    return (
      <Pressable onPress={() => navigation.navigate('Friends')}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658320057/IFrameApplication/user-group-296_f92mpd.png',
          }}
          style={{width: 30, height: 30}}
        />
      </Pressable>
    );
  };
  return (
    <ScrollView>
      <Header text={'Conversations'} Action={Action} />

      <ConversationSearch search={search} setSearch={setSearch} />

      <View style={styles.section_container}>
        <MapConversations
          conversations={_conversations}
          lastMessages={lastMessages}
          loading={loading}
          navigation={navigation}
          email={email}
          userId={userId}
          search={search}
          scrollRef={scrollRef}
        />
      </View>

      {loading && (
        <View
          style={{
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            borderRadius: 12,
          }}>
          <SkeletonMessSection />
          <SkeletonMessSection />
          <SkeletonMessSection />
          <SkeletonMessSection />
        </View>
      )}

      {_conversations && _conversations.length === 0 && !loading && (
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text style={styles.notFound}>No results found</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default connect(
  (state: any) => ({
    loggedIn: state.auth.loggedIn,
    conversations: state.conversation.conversations,
    email: state.auth.email,
    username: state.auth.username,
    userId: state.auth.userId,
    _messages: state.conversation.messages,
    _total: state.conversation.total,
    lastMessages: state.conversation.lastMessages,
  }),
  {
    receiveMessage: receiveMessageConnect,
    lastMessage,
    seenMessageByOther: seenMessageByOtherConnect,
    getConversations,
    removeConversation: removeConversationConnect,
    addConversation: addConversationConnect,
    logout,
    deleteConversationData,
    deleteSocialData,
    statusConversation: statusConversationConnect,
  },
)(Conversations);

const styles = StyleSheet.create({
  section_container: {
    position: 'relative',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  notFound: {
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 36,
    textTransform: 'uppercase',
    color: 'rgb(150, 150, 150)',
  },
});
