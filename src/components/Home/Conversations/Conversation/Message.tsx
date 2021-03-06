import React, {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TextMessage} from '../../../../typings';

const Message: FC<TextMessage> = ({text, date, index, media, time}) => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          alignItems: index === 1 ? 'flex-start' : 'flex-end',
        },
      ]}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !media
              ? index === 1
                ? '#1A73E8'
                : '#727272'
              : 'transparent',
          },
        ]}>
        <Text style={styles.time}>{time}</Text>
        {!media ? (
          <Text style={styles.text}>{text}</Text>
        ) : (
          <Image
            source={{
              uri: media,
            }}
            style={{width: 250, height: 300, marginTop: 5}}
          />
        )}
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 25,
  },
  container: {
    maxWidth: 300,
    paddingTop: 20,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingBottom: 10,
    minWidth: 60,
  },
  time: {
    position: 'absolute',
    top: 7,
    left: 20,
    color: '#BEBDBD',
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
});
