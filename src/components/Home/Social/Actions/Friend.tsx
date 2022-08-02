import React from 'react';
import {Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Friends: {id: string};
};

const Friend = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.navigate('Friends', {id: 'Friends'})}>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658320057/IFrameApplication/user-group-296_f92mpd.png',
        }}
        style={styles.image}
      />
    </Pressable>
  );
};

export default Friend;

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
  },
});
