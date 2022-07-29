import React, {FC} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface HeaderProps {
  text: string;
  image: string;
  Action?: any;
}

const Header: FC<HeaderProps> = ({
  text = '',
  image = '/',
  Action = () => <View style={{width: 55, height: 55}}></View>,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Action />
        <Text style={styles.text}>{text}</Text>
        <Image
          source={{
            uri: image,
          }}
          style={styles.img}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 129,
    backgroundColor: '#1D1D1D',
  },
  container: {
    justifyContent: 'space-around',
    backgroundColor: '#0C0C0C',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 129,
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
