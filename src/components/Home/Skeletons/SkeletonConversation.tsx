import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

const Message = () => {
  return (
    <View
      style={[
        styles.message,
        {
          width: 10 * Math.floor(Math.random() * 8 + 7) + 100,
          height: 20 * Math.floor(Math.random() * 3) + 60,
          alignSelf:
            Math.floor(Math.random() * 2) === 1 ? 'flex-end' : 'flex-start',
        },
      ]}></View>
  );
};

const SkeletonConversation = () => {
  return (
    <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </ScrollView>
  );
};

export default SkeletonConversation;

const styles = StyleSheet.create({
  message: {
    backgroundColor: 'rgb(100, 100, 100)',
    marginTop: 20,
    borderRadius: 12,
    position: 'relative',
    paddingHorizontal: 10,
    paddingVertical: 20,
    overflow: 'hidden',
  },
});
