import React from 'react';
import {View, Dimensions, Text, StyleSheet} from 'react-native';
import {Fold} from 'react-native-animated-spinkit';

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
      <Text style={styles.loadingText}>Loading...</Text>
      <Fold size={100} color={'white'} />
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
    color: 'white',
  },
});
