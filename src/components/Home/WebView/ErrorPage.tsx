import React from 'react';
import {View, Dimensions, Text, StyleSheet, Image} from 'react-native';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const LoadingPage = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight - 100,
        backgroundColor: '#1D1D1D',
      }}>
      <Text style={styles.loadingText}>Page could not be loaded...</Text>
      <Image
        style={{width: 124, height: 124}}
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1659099504/IFrameApplication/no-data-7722_oibvwv.png',
        }}
      />
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  loadingText: {
    position: 'relative',
    bottom: 30,
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    color: '#a8a8a8',
    paddingHorizontal: 20,
  },
});
