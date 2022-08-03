import React, {useState, useEffect, useRef, useMemo, FC} from 'react';
import {TextMessage, MessageContainerProps} from '../../../src/typings';
import {connect} from 'react-redux';
import axios from 'axios';
import {useSocket} from '../../../src/hooks/useSocket';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import SkeletonConversation from '../../../src/components/Home/Skeletons/SkeletonConversation';
import {format} from 'date-fns';
import {formatDate, dateDiffers} from '../../../src/utils/formatDate';
import Message from '../../../src/components/Home/Conversations/Conversation/Message';
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

  const onScrollContainer = () => {
    if (
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
  };

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

  const getMoreMessagesToConv = (e: any) => {
    if (
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

    const _skip = skip + 100;
    setActivate(true);
    setLoading(true);
    setSkip((lSkip: number) => lSkip + 100);
    setBeforeInitialFullHeight(e.contentSize.height);
    setBeforeLayoutHeight(e.layoutMeasurement.height);

    const onFinish = () => {
      setLoading(false);

      setTimeout(() => {
        setActivate(false);
      }, 2000);
    };

    getPreviousMessages({conversationId, skip: _skip, onFinish});
  };

  const [scrolled, setScrolled] = useState(false);
  const [beforeInitialFullHeight, setBeforeInitialFullHeight] = useState(0);
  const [beforeLayoutHeight, setBeforeLayoutHeight] = useState(0);

  const rawDate = new Date();

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
        onContentSizeChange={(contentWidth, contentHeight) => {
          if (lastMessages[conversationId]?.totalUnseen === 0 && !activate) {
            scrollRef.current?.scrollTo({y: contentHeight, animated: false});
            setTimeout(() => {
              setScrolled(true);
            }, 0);
          }
          if (activate) {
            scrollRef.current?.scrollTo({
              y: contentHeight - beforeLayoutHeight - beforeInitialFullHeight,
              animated: false,
            });
          }
        }}
        style={{opacity: scrolled ? 1 : 0}}
        onScroll={event => {
          if (
            event.nativeEvent.contentOffset.y +
              event.nativeEvent.layoutMeasurement.height >=
            event.nativeEvent.contentSize.height - 30
          ) {
            onScrollContainer();
          }
          if (event.nativeEvent.contentOffset.y <= 30) {
            getMoreMessagesToConv(event.nativeEvent);
          }
        }}>
        {messages && messages.length > 0 && !initialLoading ? (
          <>
            {loading && (
              <View style={{alignItems: 'center', marginBottom: 10}}>
                <ActivityIndicator size={40} color={'rgb(200, 200, 200)'} />
              </View>
            )}
            {messages.map((message: TextMessage, key: number) => {
              if (key === messages.length - 1 && !renderFirstTime) {
                setTimeout(() => setRenderFirstTime(true), 0);
              }

              return (
                <View
                  key={key + 10}
                  onLayout={event => {
                    if (
                      lastMessages[conversationId]?.totalUnseen > 0 &&
                      key ===
                        messages.length -
                          lastMessages[conversationId]?.totalUnseen
                    ) {
                      scrollRef.current?.scrollTo({
                        y: event.nativeEvent.layout.y,
                        animated: false,
                      });

                      setTimeout(() => {
                        setScrolled(true);
                      }, 0);
                    }
                  }}>
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
            {messages &&
              messages[messages.length - 1] &&
              messages[messages.length - 1].senderEmail === myEmail && (
                <View style={styles.statusMessage}>
                  <Image
                    source={{
                      uri: !lastMessages[conversationId].seenByOther
                        ? 'https://res.cloudinary.com/multimediarog/image/upload/v1659528556/IFrameApplication/send-4009_inlm2y.png'
                        : 'https://res.cloudinary.com/multimediarog/image/upload/v1659528482/IFrameApplication/check-mark-3279_ytkt2k.png',
                    }}
                    style={{height: 15, width: 15}}
                  />
                  <Text style={styles.statusText}>Sent</Text>
                </View>
              )}
          </>
        ) : (
          <>
            {initialLoading && (
              <View style={{marginBottom: 20}}>
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
    flexDirection: 'column',
    flexWrap: 'nowrap',
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  dateFlex: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  statusMessage: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginTop: -25,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginLeft: 6,
  },
});
