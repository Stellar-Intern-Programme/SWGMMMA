import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const BackArrow = () => {
  const navigation = useNavigation();

  const goToAnotherRoute = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={goToAnotherRoute} style={styles.backLeftArrow}>
      <Image
        style={styles.backLeftArrowImage}
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1657790812/IFrameApplication/Vector_y46yx3.png',
        }}
      />
    </Pressable>
  );
};

export default BackArrow;

const styles = StyleSheet.create({
  backLeftArrow: {},
  backLeftArrowImage: {
    width: 20,
    height: 20,
  },
});
