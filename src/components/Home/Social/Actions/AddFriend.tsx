import React from 'react';
import {Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  AddFriends: {id: string};
};

const AddFriend = ({}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('AddFriends', {id: 'AddFriends'})}>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658706091/IFrameApplication/user-273_jdmtou.png',
        }}
        style={styles.image}
      />
    </Pressable>
  );
};

export default AddFriend;

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
  },
});
