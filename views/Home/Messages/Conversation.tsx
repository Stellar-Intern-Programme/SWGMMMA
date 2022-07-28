import React from 'react';
import {View, Text} from 'react-native';

const Conversation = ({route}: {route: any}) => {
  return (
    <View>
      <Text>{route.params.conversationId}</Text>
    </View>
  );
};

export default Conversation;