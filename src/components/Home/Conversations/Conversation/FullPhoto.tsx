import React, {useState} from 'react';
import {Text, Image, StyleSheet, Pressable} from 'react-native';
import FadeInOut from 'react-native-fade-in-out';

const FullPhoto = ({
  image,
  setImage,
  senderName,
  myUsername,
  senderMail,
  myMail,
}: {
  image: string;
  setImage: any;
  senderName: string;
  myUsername: string;
  senderMail: string;
  myMail: string;
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <FadeInOut visible={visible} style={styles.closeContainer} duration={200}>
        <Pressable
          onPress={() => {
            if (visible) {
              setImage(null);
            }
          }}
          style={styles.subCloseContainer}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1659600310/IFrameApplication/arrow-left-3099_lftsnf.png',
            }}
            style={{height: 20, width: 15}}
          />
          <Text style={styles.senderText}>
            {senderMail === myMail ? 'You' : senderName}
          </Text>
        </Pressable>
      </FadeInOut>
      <Pressable onPress={() => setVisible(!visible)} style={styles.container}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            position: 'relative',
          }}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    marginLeft: 20,
    zIndex: 1001,
    paddingTop: 15,
  },
  subCloseContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  senderText: {
    color: 'white',
    marginLeft: 15,
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '400',
    position: 'relative',
    bottom: 1,
  },
});

export default FullPhoto;
