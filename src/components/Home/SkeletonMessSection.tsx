import React from 'react';
import {View, StyleSheet} from 'react-native';

const SkeletonMessSection = () => {
  return (
    <View style={styles.container}>
      {/*<View style={styles.img} />*/}
      {/*<View style={styles.containerData}>*/}
      {/*  <View style={styles.name} />*/}
      {/*  <View style={styles.message} />*/}
      {/*</View>*/}
      {/*<View style={styles.hour} />*/}
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
  },
});
