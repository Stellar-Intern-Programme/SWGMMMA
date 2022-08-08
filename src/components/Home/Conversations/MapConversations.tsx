import React, {FC} from 'react';
import MessSection from './MessSection';

interface Props {
  conversations: any;
  lastMessages: any;
  loading: boolean;
  navigation: any;
  email: string;
  userId: string;
  search: string;
  scrollRef: any;
}
const MapConversations: FC<Props> = ({
  conversations,
  lastMessages,
  loading,
  navigation,
  email,
  userId,
  search,
  scrollRef,
}) => {
  return (
    <>
      {conversations &&
        !loading &&
        conversations
          .filter((item: any) =>
            item.people
              .filter(
                (p: any) => p.email.toLowerCase() !== email.toLowerCase(),
              )[0]
              .email.toLowerCase()
              .startsWith(search.toLowerCase()),
          )
          .map((conversation: any, key: number) => {
            return (
              <MessSection
                key={key}
                scrollRef={scrollRef}
                person={
                  conversation.people
                    ? conversation.people.filter(
                        (chatter: any) => chatter.email !== email,
                      )[0]
                    : ''
                }
                message={
                  lastMessages[conversation._id] &&
                  lastMessages[conversation._id].message
                    ? lastMessages[conversation._id].message
                    : ''
                }
                media={lastMessages[conversation._id]?.media !== '' || false}
                totalUnseen={
                  lastMessages[conversation._id]
                    ? lastMessages[conversation._id].totalUnseen
                    : 0
                }
                conversationId={conversation._id}
                imageUrl={
                  conversation.people.filter((p: any) => p._id !== userId)[0]
                    .profile.avatar
                }
                time={lastMessages[conversation._id]?.time}
                navigation={navigation}
              />
            );
          })}
    </>
  );
};

export default MapConversations;
