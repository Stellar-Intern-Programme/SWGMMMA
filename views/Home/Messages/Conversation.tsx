import React, {useState, useEffect, useRef, useMemo, FC} from 'react';
import {TextMessage, MessageContainerProps} from '../../../src/typings';
import {connect} from 'react-redux';
import axios from 'axios';
import {useSocket} from '../../../src/hooks/useSocket';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SkeletonConversation from '../../../src/components/Home/Skeletons/SkeletonConversation';
import {format} from 'date-fns';
import {formatDate, dateDiffers} from '../../../src/utils/formatDate';
import Message from '../../../src/components/Home/Conversations/Conversation/Message';
import {IOScrollView, InView} from 'react-native-intersection-observer';
import {
  getInitialMessages as getInitialMessagesConnect,
  getPreviousMessages as getPreviousMessagesConnect,
  receiveMessage as receiveMessageConnect,
  lastMessage as lastMessageConnect,
  seeMessage as seeMessageConnect,
  addNotReadyMessage as addNotReadyMessageConnect,
} from '../../../src/actions/conversationActions';
import Header from '../../../src/components/Home/Header';
import BackArrow from '../../../src/components/Home/BackArrow';
import CreateMessageContainer from '../../../src/components/Home/Conversations/Conversation/CreateMessageContainer';

const Conversation: FC<MessageContainerProps> = ({
  route,
  addNotReadyMessage,
  nrMessages,
  nrMessagesLoadings,
  myEmail,
  userId,
  _messages,
  _total,
  getInitialMessages,
  getPreviousMessages,
  seeMessage,
  lastMessages,
  conversations,
}) => {
  const conversationId = route.params.conversationId;
  const pfpOther = route.params.pfpOther;
  const scrollRef = route.params.scrollRef;
  const socket = useSocket();
  const scrollViewRef = useRef<any>(null);

  const [isTemp, setIsTemp] = useState(false);

  const blocked = useMemo(
    () =>
      conversations.filter((c: any) => c._id === route.params.conversationId)[0]
        .blocked,
    [conversations, route.params.conversationId],
  );

  const messages: any = useMemo<any>(
    () => (_messages[conversationId] ? _messages[conversationId] : []),
    [conversationId, _messages],
  );

  const total: any = useMemo<any>(
    () => (_total[conversationId] ? _total[conversationId] : 0),
    [conversationId, _total],
  );

  const [skip, setSkip] = useState(0);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [newContainer, setNewContainer] = useState(true);

  // const ref = useRef();
  const altRef = useRef();
  const alreadyUnseenRef = useRef<any>(null);
  const altInView = false;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (
      altInView &&
      messages[messages.length - 1] &&
      (!messages[messages.length - 1].seen.includes(userId) ||
        !messages[0].seen.includes(userId))
    ) {
      seeMessage({
        conversationId,
        messageId: !messages[messages.length - 1].seen.includes(userId)
          ? messages[messages.length - 1]._id
          : messages[0]._id,
        seenEmail: myEmail,
        messageSeenByOther: socket!.messageSeenByOther,
      });
    }
  }, [altInView, conversationId, seeMessage, messages]);

  const [renderFirstTime, setRenderFirstTime] = useState(false);

  const scrollContainer = useRef<any>(null);

  useEffect(() => {
    const getConversation = async () => {
      setTimeout(() => {
        // scrollRef.current?.scrollIntoView();
      }, 0);

      const onSuccess = () => {
        if (lastMessages[conversationId].totalUnseen > 0) {
          setTimeout(() => {
            // alreadyUnseenRef.current?.scrollIntoView();
          }, 0);
        } else {
          setTimeout(() => {
            // scrollRef.current?.scrollIntoView();
          }, 0);
        }
      };

      const onGettingMessages = () => {
        setInitialLoading(false);
      };

      if (!(messages.length > 0) && lastMessages[conversationId]) {
        setSkip(0);
        setInitialLoading(true);
        setNewContainer(false);

        getInitialMessages({
          conversationId,
          onSuccess,
          onGettingMessages,
          totalUnseen: lastMessages[conversationId].totalUnseen,
        });
      }
    };

    if (newContainer) {
      getConversation();
    }

    setLoading(false);
  }, [
    conversationId,
    newContainer,
    setNewContainer,
    skip,
    getInitialMessages,
    initialLoading,
  ]);

  const [activate, setActivate] = useState(false);

  // useEffect(() => {
  //   console.log(scrollViewRef.current?.topScroll);
  // }, [scrollViewRef]);

  useEffect(() => {
    if (
      !inView ||
      total <= messages.length ||
      skip > total ||
      loading ||
      activate ||
      !messages.length ||
      initialLoading ||
      !renderFirstTime
    ) {
      return;
    }

    const source = axios.CancelToken.source();

    const getMoreMessages = async () => {
      const _skip = skip + 100;
      setActivate(true);
      setLoading(true);
      setSkip((lSkip: number) => lSkip + 100);

      const onFinish = () => {
        setLoading(false);

        setTimeout(() => {
          scrollContainer.current?.scrollIntoView();
        }, 0);

        setTimeout(() => {
          setActivate(false);
        }, 2000);
      };

      getPreviousMessages({conversationId, skip: _skip, onFinish});
    };

    getMoreMessages();

    return () => {
      source.cancel();
    };
  }, [
    inView,
    activate,
    loading,
    _total,
    initialLoading,
    renderFirstTime,
    getPreviousMessages,
  ]);

  return (
    <View style={{flex: 1}}>
      <Header
        Action={BackArrow}
        text={
          conversations
            .filter((c: any) => c._id === route.params.conversationId)[0]
            .people.filter((p: any) => p.email !== myEmail)[0].username
        }
        backColor={'#1D1D1D'}
        convPfp={pfpOther}
      />
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        ref={scrollRef}
        onContentSizeChange={() => {
          if (!initialLoading) {
            (scrollRef?.current as any)?.scrollToEnd({animated: false});
          }
        }}>
        {messages && messages.length > 0 && !initialLoading ? (
          <>
            {messages.map((message: TextMessage, key: number) => {
              if (key === messages.length - 1 && !renderFirstTime) {
                setTimeout(() => setRenderFirstTime(true), 0);
              }

              let lastIndex = -1;
              messages.forEach((m: any, lKey: number) => {
                if (m.senderEmail !== myEmail) {
                  lastIndex = lKey;
                }
              });

              const rawDate = new Date();
              return (
                <View key={key + 10}>
                  {messages[key - 1] &&
                    dateDiffers(messages[key - 1].date, message.date) && (
                      <View key={key + 1} style={styles.dateFlex}>
                        <View key={key + 2} style={styles.dateLine} />
                        <Text key={key + 3} style={styles.dateText}>
                          {format(rawDate, 'dd-MM-yyyy') === message.date
                            ? 'Today'
                            : formatDate(message.date)}
                        </Text>
                        <View key={key + 4} style={styles.dateLine} />
                      </View>
                    )}
                  {key === 0 && (
                    <View key={key + 1} style={styles.dateFlex}>
                      <View key={key + 2} style={styles.dateLine} />
                      <Text key={key + 3} style={styles.dateText}>
                        {format(new Date(), 'dd-MM-yyyy') !== message.date
                          ? formatDate(message.date)
                          : 'Today'}
                      </Text>
                      <View key={key + 4} style={styles.dateLine} />
                    </View>
                  )}
                  <Message
                    key={key}
                    index={myEmail === message.senderEmail ? 2 : 1}
                    text={message.text}
                    date={message.date}
                    senderEmail={message.senderEmail}
                    media={message.media ? message.media : ''}
                    time={message?.time || '00:00'}
                  />
                </View>
              );
            })}
          </>
        ) : (
          <>
            {initialLoading && (
              <View>
                <SkeletonConversation />
                <SkeletonConversation />
                <SkeletonConversation />
                <SkeletonConversation />
                <SkeletonConversation />
                <SkeletonConversation />
                <SkeletonConversation />
                <SkeletonConversation />
              </View>
            )}
          </>
        )}
      </ScrollView>
      <CreateMessageContainer
        blocked={blocked}
        conversationId={conversationId}
        userId={userId}
        myEmail={myEmail}
        nrMessages={nrMessages}
        nrMessagesLoadings={nrMessagesLoadings}
        addNotReadyMessage={addNotReadyMessage}
        scrollRef={scrollRef}
      />
    </View>
  );
};

export default connect(
  (state: any) => ({
    _messages: state.conversation.messages,
    _total: state.conversation.total,
    lastMessages: state.conversation.lastMessages,
    nrMessages: state.conversation.nrMessages,
    nrMessagesLoadings: state.conversation.nrMessagesLoadings,
    conversations: state.conversation.conversations,
    userId: state.auth.userId,
    myEmail: state.auth.email,
  }),
  {
    getInitialMessages: getInitialMessagesConnect,
    getPreviousMessages: getPreviousMessagesConnect,
    receiveMessage: receiveMessageConnect,
    lastMessage: lastMessageConnect,
    seeMessage: seeMessageConnect,
    addNotReadyMessage: addNotReadyMessageConnect,
  },
)(Conversation);

const styles = StyleSheet.create({
  messagesContainer: {
    width: '100%',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dateFlex: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateLine: {
    width: 50,
    marginHorizontal: 10,
    backgroundColor: 'rgb(150, 150, 150)',
    height: 2,
    borderRadius: 5,
  },
  dateText: {
    color: 'rgb(150, 150, 150)',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
  },
});
