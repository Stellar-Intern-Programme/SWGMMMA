import React from 'react';
import {Image, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Requests: {id: string};
};

const Request = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Requests', {id: 'Requests'})}>
      <Image
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658707287/IFrameApplication/notification-bell-13083_aergib.png',
        }}
        style={styles.image}
      />
    </Pressable>
  );
};

export default Request;

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
  },
});
