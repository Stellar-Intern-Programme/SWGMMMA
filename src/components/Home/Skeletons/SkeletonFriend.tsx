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
      <Animated.View style={[styles.img]} />
      <View style={styles.name} />
      <View style={styles.buttonContainer}>
        <View style={styles.button} />
        <View style={styles.button} />
      </View>
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
    justifyContent: 'space-around',
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
  name: {
    width: 140,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'rgb(100, 100, 100)',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    left: 20,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: 'rgb(100, 100, 100)',
    marginRight: 20,
  },
});
