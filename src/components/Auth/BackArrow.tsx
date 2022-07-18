import {Image, Pressable, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Register: {id: string};
};

interface Props {
  overrideRoute?: 'Register';
}

const BackArrow: FC<Props> = ({overrideRoute}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const goToAnotherRoute = () => {
    if (!overrideRoute) {
      navigation.goBack();
    } else {
      navigation.navigate(overrideRoute, {id: overrideRoute});
    }
  };

  return (
    <Pressable onPress={goToAnotherRoute} style={styles.backLeftArrow}>
      <Image
        style={styles.backLeftArrowImage}
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1657790812/IFrameApplication/Vector_y46yx3.png',
        }}
      />
    </Pressable>
  );
};

export default BackArrow;

const styles = StyleSheet.create({
  backLeftArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backLeftArrowImage: {
    width: 20,
    height: 20,
  },
});
