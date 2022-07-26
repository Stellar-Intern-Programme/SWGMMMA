import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const SkeletonMessSection = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }),
        Animated.timing(progress, {
          toValue: 0,
          useNativeDriver: true,
          duration: 1000,
        }),
      ]),
    ).start();
  }, [progress]);

  const bgAnimation = {
    backgroundColor: progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(100, 100, 100, 1)', 'rgba(200, 200, 200, 1)'],
    }),
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.img, bgAnimation]} />
      <View style={styles.containerData}>
        <View style={styles.name} />
        <View style={styles.message} />
      </View>
      <View style={styles.hour} />
    </View>
  );
};

export default SkeletonMessSection;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#414141',
    height: 84,
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
    backgroundColor: 'rgb(100, 100, 100)',
    borderRadius: 50,
    marginRight: 25,
  },
  containerData: {
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  name: {
    width: 50,
    height: 10,
    backgroundColor: 'rgb(100, 100, 100)',
    marginBottom: 15,
    borderRadius: 10,
  },
  message: {
    width: 150,
    height: 10,
    backgroundColor: 'rgb(100, 100, 100)',
    borderRadius: 10,
  },
  hour: {
    width: 40,
    height: 10,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgb(100, 100, 100)',
    borderRadius: 10,
  },
});
