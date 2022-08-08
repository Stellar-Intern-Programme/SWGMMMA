import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';

const TabBar = ({navigation}: {navigation: any}) => {
  const route = navigation
    .getState()
    .history[navigation.getState().history.length - 1].key.split('-')[0];
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Movies')}>
          <Image
            source={{
              uri:
                route !== 'Movies'
                  ? 'https://res.cloudinary.com/multimediarog/image/upload/v1658225248/IFrameApplication/Vector_aomebb.png'
                  : 'https://res.cloudinary.com/multimediarog/image/upload/v1659100364/IFrameApplication/filmstrip_1_mvdbip.png',
            }}
            fadeDuration={0}
            style={styles.logo}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Music')}>
          <Image
            source={{
              uri:
                route !== 'Music'
                  ? 'https://res.cloudinary.com/multimediarog/image/upload/v1658225269/IFrameApplication/Vector_amumae.png'
                  : 'https://res.cloudinary.com/multimediarog/image/upload/v1659100364/IFrameApplication/Vector_gwmxyb.png',
            }}
            fadeDuration={0}
            style={styles.logo}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Conversations')}>
          <Image
            source={{
              uri:
                route === 'Conversations'
                  ? 'https://res.cloudinary.com/multimediarog/image/upload/v1657790641/IFrameApplication/Group_kzu8co.png'
                  : 'https://res.cloudinary.com/multimediarog/image/upload/v1659101498/IFrameApplication/Group_grzbeb.png',
            }}
            fadeDuration={0}
            style={styles.mainLogo}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Avatars')}>
          <Image
            source={{
              uri:
                route !== 'Avatars'
                  ? 'https://res.cloudinary.com/multimediarog/image/upload/v1658225323/IFrameApplication/Vector_ivdkqk.png'
                  : 'https://res.cloudinary.com/multimediarog/image/upload/v1659100365/IFrameApplication/death-star-variant_1_ypnjys.png',
            }}
            fadeDuration={0}
            style={styles.logo}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Quotes')}>
          <Image
            source={{
              uri:
                route !== 'Quotes'
                  ? 'https://res.cloudinary.com/multimediarog/image/upload/v1658225346/IFrameApplication/Vector_rbqp3r.png'
                  : 'https://res.cloudinary.com/multimediarog/image/upload/v1659100364/IFrameApplication/comment-quote_1_nkpyex.png',
            }}
            fadeDuration={0}
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
