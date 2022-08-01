import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';

const TabBar = ({navigation}: {navigation: any}) => {
  const route =
    navigation
      .getState()
      .history[navigation.getState().history.length - 1].key.split('-')[0] !==
    'Movies';
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Movies')}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658225248/IFrameApplication/Vector_aomebb.png',
            }}
            style={styles.logo}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Music')}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658225269/IFrameApplication/Vector_amumae.png',
            }}
            style={styles.logo}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Conversations')}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1657790641/IFrameApplication/Group_kzu8co.png',
            }}
            style={styles.mainLogo}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Avatars')}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658225323/IFrameApplication/Vector_ivdkqk.png',
            }}
            style={styles.logo}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Quotes')}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658225346/IFrameApplication/Vector_rbqp3r.png',
            }}
            style={styles.logo}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1D1D1D',
    width: '100%',
    height: 67,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#0C0C0C',
  },
  mainLogo: {
    position: 'relative',
    width: 75,
    height: 75,
    bottom: 30,
  },
  logo: {
    width: 35,
    height: 35,
  },
});
