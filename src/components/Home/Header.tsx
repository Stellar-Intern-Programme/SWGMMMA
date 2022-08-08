import React, {FC} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

interface HeaderProps {
  text: string;
  Action?: any;
  SecondAction?: any;
  pfp: string;
  backColor?: string;
  convPfp?: string;
}

type RootStackParamList = {
  Profile: {id: string};
};

const Header: FC<HeaderProps> = ({
  text = '',
  Action = () => <View style={{width: 55, height: 55}}></View>,
  pfp = 'https://res.cloudinary.com/multimediarog/image/upload/v1658320601/IFrameApplication/ezgif.com-gif-maker_qbz0uj.png',
  backColor,
  SecondAction,
  convPfp,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={[
        styles.wrapper,
        {backgroundColor: backColor ? backColor : '#2E2E2E'},
      ]}>
      <View style={styles.container}>
        <Action />
        <Text style={styles.text} numberOfLines={1}>
          {text}
        </Text>

        {!SecondAction ? (
          !convPfp ? (
            <Pressable
              onPress={() => navigation.navigate('Profile', {id: 'Profile'})}>
              <Image
                source={{
                  uri:
                    pfp ||
                    'https://res.cloudinary.com/multimediarog/image/upload/v1658320601/IFrameApplication/ezgif.com-gif-maker_qbz0uj.png',
                }}
                style={styles.img}
              />
            </Pressable>
          ) : (
            <Image
              source={{
                uri: convPfp,
              }}
              style={styles.img}
            />
          )
        ) : (
          <SecondAction />
        )}
      </View>
    </View>
  );
};

export default connect((state: any) => ({pfp: state.auth.pfp}), {})(Header);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,
    backgroundColor: '#2E2E2E',
  },
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: '#0C0C0C',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 100,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  img: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
});
