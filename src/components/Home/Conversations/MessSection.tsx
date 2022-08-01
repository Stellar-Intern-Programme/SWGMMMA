import React, {FC} from 'react';
import {View, StyleSheet, Image, Text, Pressable} from 'react-native';
import {MessSectionProps} from '../../../typings';

const MessSection: FC<MessSectionProps> = ({
  imageUrl,
  person,
  totalUnseen,
  message,
  conversationId,
  navigation,
  time,
  scrollRef,
  media,
}) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Conversation', {
          conversationId,
          pfpOther: person.profile.avatar,
          scrollRef,
        })
      }>
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
                backgroundColor: 'rgb(50, 50, 50)',
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
          {!media ? (
            <Text style={styles.message} numberOfLines={2}>
              {message}
            </Text>
          ) : Boolean(message.length) ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                height: 50,
              }}>
              <Image
                style={{width: 20, height: 20, marginTop: -19}}
                source={{
                  uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1659303653/IFrameApplication/image-941_1_oyjlod.png',
                }}
              />
              <Text style={styles.imageText}>Image</Text>
            </View>
          ) : (
            <View style={{height: 50}} />
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
    width: 235,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    height: 50,
    fontFamily: 'Inter',
    fontSize: 13,
    borderRadius: 10,
    color: 'white',
    fontWeight: '700',
    top: 5,
  },
  imageText: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: 'white',
    fontWeight: '700',
    marginLeft: 10,
    height: 50,
    top: 5,
  },
  hour: {
    width: 40,
    position: 'absolute',
    bottom: 2,
    right: 0,
    borderRadius: 10,
    color: 'white',
    fontWeight: '700',
  },
});
