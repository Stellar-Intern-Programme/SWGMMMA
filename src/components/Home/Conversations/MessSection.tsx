import React, {FC} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {MessSectionProps} from '../../../typings';
import RenderHtml from 'react-native-render-html';
import parse from 'html-react-parser';

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
          <Text style={styles.name} numberOfLines={1}>
            {person.username} ({person.email})
          </Text>
          {Number(totalUnseen) > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -15,
                left: -100,
                backgroundColor: 'blue',
                borderRadius: 5,
                padding: 2,
                paddingHorizontal: totalUnseen < 10 ? 4 : 2,
              }}>
              <Text
                style={{
                  position: 'relative',
                  color: totalUnseen === 0 ? 'white' : 'white',
                  fontWeight: totalUnseen === 0 ? '600' : '300',
                  left: 1,
                }}>
                {Number(totalUnseen) > 0 ? totalUnseen : ''}
              </Text>
            </View>
          )}
          {message === parse(message) ? (
            <Text style={styles.message}>{message}</Text>
          ) : (
            <Text style={styles.message}>
              <RenderHtml
                contentWidth={220}
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
        <Text style={styles.hour}>{time ? time : ''}</Text>
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
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
    overflow: 'visible',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 25,
  },
  containerData: {
    position: 'relative',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  name: {
    marginBottom: 0,
    borderRadius: 10,
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#D9D9D9',
    width: 220,
  },
  message: {
    width: 250,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    height: 50,
    fontFamily: 'Inter',
    fontSize: 15,
    borderRadius: 10,
    color: 'white',
    fontWeight: '700',
    top: 5,
  },
  hour: {
    width: 40,
    position: 'absolute',
    bottom: 2,
    right: 10,
    borderRadius: 10,
    color: 'white',
    fontWeight: '700',
  },
});
