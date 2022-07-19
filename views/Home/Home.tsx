import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
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
import SkeletonMessSection from '../../src/components/Home/SkeletonMessSection';

const Home = ({
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
}) => {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [newContainer, setNewContainer] = useState(false);

  const [loading, setLoading] = useState(false);

  const mcRef = useRef<any>(null);

  const onMyMessage = ({senderEmail}: {senderEmail: string}) => {
    if (
      email === senderEmail ||
      (mcRef.current?.scrollTop <
        mcRef.current?.scrollHeight - mcRef.current?.clientHeight + 35 &&
        mcRef.current?.scrollTop >
          mcRef.current?.scrollHeight - mcRef.current?.clientHeight - 35)
    ) {
      setTimeout(() => scrollRef.current?.scrollIntoView(), 0);
    }
  };

  const scrollRef = useRef<any>(null);

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
    const onSuccess = () => {
      setConversationId(null);
    };

    removeConversation({conversationId, onSuccess});
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

    socket!.eventListeners({
      receiveMessage: receiveMessageProp,
      seenMessageByOther: seenMessageByOtherProp,
      email,
      userId,
      removeConversation: removeConversationProp,
      addConversation: addConversationProp,
      conversationStatus: statusConversationProps,
    });

    lastMessage();

    const initialConversations = async () => {
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
  return (
    <View>
      <Header
        text={'Conversations'}
        image={
          'https://res.cloudinary.com/multimediarog/image/upload/v1657790641/IFrameApplication/Group_kzu8co.png'
        }
      />

      {/*<View styles={styles.section_container}>*/}
      {/*  {conversations &&*/}
      {/*    conversations.map((conversation: any, key: number) => {*/}
      {/*      return (*/}
      {/*        <MessSection*/}
      {/*          key={key}*/}
      {/*          setConversationId={setConversationId}*/}
      {/*          myUsername={username}*/}
      {/*          myEmail={email}*/}
      {/*          person={*/}
      {/*            conversation.people*/}
      {/*              ? conversation.people.filter(*/}
      {/*                  (chatter: any) => chatter.email !== email,*/}
      {/*                )[0]*/}
      {/*              : ''*/}
      {/*          }*/}
      {/*          message={*/}
      {/*            lastMessages[conversation._id] &&*/}
      {/*            lastMessages[conversation._id].message*/}
      {/*              ? lastMessages[conversation._id].message*/}
      {/*              : ''*/}
      {/*          }*/}
      {/*          seenMessage={*/}
      {/*            lastMessages[conversation._id]*/}
      {/*              ? lastMessages[conversation._id].seen*/}
      {/*              : true*/}
      {/*          }*/}
      {/*          totalUnseen={*/}
      {/*            lastMessages[conversation._id]*/}
      {/*              ? lastMessages[conversation._id].totalUnseen*/}
      {/*              : 0*/}
      {/*          }*/}
      {/*          conversationId={conversation._id}*/}
      {/*          globalConversationId={conversationId}*/}
      {/*          setNewContainer={setNewContainer}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    })}*/}
      {/*</View>*/}

      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'nowrap',
          alignItems: 'center',
          borderRadius: 12,
        }}>
        {/*{!loading && (*/}
        {/*  <>*/}
        <SkeletonMessSection />
        <SkeletonMessSection />
        <SkeletonMessSection />
        <SkeletonMessSection />
        {/*</>*/}
        {/*)}*/}
      </View>
    </View>
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
)(Home);

const styles = StyleSheet.create({});
