import React, {useState, FC} from 'react';
import {View, StyleSheet, TextInput, Dimensions, Image} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

const width = Dimensions.get('screen').width;
const CreateMessageContainer = () => {
  const [value, setValue] = useState('');
  return (
    <Shadow distance={10} startColor={'rgba(0, 0, 0, 0.3)'} radius={0}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              value={value}
              onChangeText={newValue => setValue(newValue)}
              style={styles.input}
              placeholderTextColor={'#B7B6B6'}
              placeholder={'ENTER YOUR TEXT HERE'}
            />
            <Image
              source={{
                uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658425761/IFrameApplication/image_1_tvjbjz.png',
              }}
              style={styles.photoIcon}
            />
          </View>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658425234/IFrameApplication/Group_9_kjl1mp.png',
            }}
            style={styles.sendIcon}
          />
        </View>
      </View>
    </Shadow>
  );
};

export default CreateMessageContainer;

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: 100,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 8,
  },
  inputContainer: {
    width: '70%',
    position: 'relative',
  },
  photoIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#727272',
    borderRadius: 60,
    paddingLeft: 20,
    paddingRight: 42,
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  sendIcon: {
    width: 90,
    height: 90,
  },
});
