import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';

const FrontDesign = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageLogo}
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1657790641/IFrameApplication/Group_kzu8co.png',
        }}
      />
    </View>
  );
};

export default FrontDesign;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    width: 100,
    height: 100,
  },
});
