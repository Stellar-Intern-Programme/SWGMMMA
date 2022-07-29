import React, {FC} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {MessSectionProps} from '../../../typings';
import RenderHtml from 'react-native-render-html';
import parse from 'html-react-parser';
import RenderHTML from 'react-native-render-html';

const MessSection: FC<MessSectionProps> = ({
  imageUrl,
  person,
  totalUnseen,
  message,
  conversationId,
  navigation,
  time,
}) => {
  const source = {
    html: message,
  };
  return (
    <Pressable
      onPress={() => navigation.navigate('Conversation', {conversationId})}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: imageUrl,
          }}
        />
        <View style={styles.containerData}>
          <Text style={styles.name}>{person.username}</Text>
          {message === parse(message) ? (
            <Text
              style={{
                ...styles.message,
                ...{
                  color: totalUnseen > 0 ? '#169CEE' : 'white',
                  fontWeight: totalUnseen > 0 ? '600' : '300',
                },
              }}>
              <Text style={{marginRight: 20}}>
                {totalUnseen > 0 ? totalUnseen : ''}
              </Text>
              {message}
            </Text>
          ) : (
            <Text
              style={{
                ...styles.message,
                ...{
                  color: totalUnseen > 0 ? '#169CEE' : 'white',
                  fontWeight: totalUnseen > 0 ? '600' : '300',
                },
              }}>
              <Text style={{marginRight: 20}}>
                {totalUnseen > 0 ? totalUnseen : ''}
              </Text>
              <RenderHtml
                contentWidth={10}
                source={source}
                tagsStyles={{
                  body: {
                    color: totalUnseen > 0 ? '#169CEE' : 'white',
                  },
                }}
              />
            </Text>
          )}
        </View>
        <Text style={styles.hour}>{time}</Text>
      </View>
    </Pressable>
  );
};

export default MessSection;

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: '#414141',
    height: 84,
    overflow: 'hidden',
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 25,
  },
  containerData: {
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  name: {
    marginBottom: 0,
    borderRadius: 10,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#D9D9D9',
  },
  message: {
    width: 100,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    height: 20,
    fontFamily: 'Inter',
    fontSize: 16,
    borderRadius: 10,
    color: 'white',
    fontWeight: '700',
  },
  hour: {
    width: 40,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 10,
    color: 'white',
  },
});
