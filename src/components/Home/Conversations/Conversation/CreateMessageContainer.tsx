import React, {useState, FC} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  Pressable,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {format} from 'date-fns';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSocket} from '../../../../hooks/useSocket';
import {CreateMessageProps} from '../../../../typings';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const CreateMessageContainer: FC<CreateMessageProps> = ({
  blocked,
  conversationId,
  userId,
  addNotReadyMessage,
  myEmail,
  scrollRef,
  nrMessagesLoadings,
  nrMessages,
}) => {
  const loading =
    nrMessagesLoadings[conversationId] &&
    nrMessagesLoadings[conversationId][0] &&
    nrMessagesLoadings[conversationId][0].active;
  const [text, setText] = useState('');
  const [start, setStart] = useState(false);
  const [imageSelect, setImageSelect] = useState(false);

  const socket = useSocket();

  const createIdForMessage = () => {
    let uniqueId = 0;

    if (nrMessages) {
      uniqueId = nrMessages.length;

      for (let i = 0; i < nrMessages.length; i++) {
        if (uniqueId === nrMessages[i].messageId) {
          uniqueId += 1;
          i = 0;
        }
      }
    }

    return uniqueId;
  };

  const openCamera = async () => {
    try {
      const result: any = await launchCamera({
        mediaType: 'photo',
        includeBase64: true,
      });

      setImageSelect(false);
      if (
        result?.assets[0]?.base64 &&
        result?.assets[0]?.fileSize &&
        result?.assets[0]?.fileSize / 100000 <= 200
      ) {
        await sendMessage_([
          `data:image/jpeg;base64,${result?.assets[0].base64}`,
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openImgLibrary = async () => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 8,
      });

      setImageSelect(false);
      if (
        result?.assets[0]?.base64 &&
        result?.assets[0]?.fileSize &&
        result?.assets[0]?.fileSize / 100000 <= 21
      ) {
        await sendMessage_(
          result?.assets?.map((asset: any) => {
            return `data:image/jpeg;base64,${asset.base64}`;
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage_ = async (files: any[]) => {
    const rawDate = new Date();

    const date = format(rawDate, 'dd-MM-yyyy');
    const time = `${
      Number(rawDate.getHours()) < 10
        ? `0${rawDate.getHours()}`
        : rawDate.getHours()
    }:${
      Number(rawDate.getMinutes()) < 10
        ? `0${rawDate.getMinutes()}`
        : rawDate.getMinutes()
    }`;

    if (
      start ||
      loading ||
      (!text.length && !files.length) ||
      blocked ||
      (text.length && text.split('').every((letter: string) => letter === ''))
    )
      return;
    setStart(true);

    setTimeout(() => {
      (scrollRef?.current as any)?.scrollToEnd({animated: false});
    }, 0);

    const msgId = createIdForMessage();

    addNotReadyMessage({
      conversationId,
      id: msgId,
      text,
      date,
      email: myEmail,
      media: files,
    });

    try {
      socket!.sendMessage({
        text,
        date,
        conversationId,
        userId,
        files,
        id: msgId,
        time,
      });
    } catch (err) {
      console.log(err);
    }

    setText('');
    setStart(false);
  };

  return (
    <>
      {imageSelect && <View style={styles.cover} />}
      <Shadow distance={10} startColor={'rgba(0, 0, 0, 0.3)'} radius={0}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                value={text}
                onChangeText={newValue => setText(newValue)}
                style={styles.input}
                placeholderTextColor={'#B7B6B6'}
                placeholder={'ENTER YOUR TEXT HERE'}
                editable={blocked || loading ? false : true}
              />

              <Pressable
                onPress={() => setImageSelect(true)}
                style={styles.photoIconPos}>
                <Image
                  source={{
                    uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658425761/IFrameApplication/image_1_tvjbjz.png',
                  }}
                  style={styles.photoIcon}
                />
              </Pressable>
            </View>

            {!loading ? (
              <Pressable onPress={() => sendMessage_([])}>
                <Image
                  source={{
                    uri: !blocked
                      ? 'https://res.cloudinary.com/multimediarog/image/upload/v1659208900/IFrameApplication/send-4008_1_lbswcg.png'
                      : 'https://res.cloudinary.com/multimediarog/image/upload/v1659208519/IFrameApplication/black-padlock-11724_4_tsi52o.png',
                  }}
                  style={styles.sendIcon}
                />
              </Pressable>
            ) : (
              <ActivityIndicator
                color={'#1B73E4'}
                style={{marginLeft: 20}}
                size={45}
              />
            )}
          </View>
        </View>
      </Shadow>
      {imageSelect && (
        <View style={styles.imageContainer}>
          <Pressable onPress={openImgLibrary}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1659274417/IFrameApplication/Vector_nispfx.png',
                }}
                style={{width: 25, height: 25}}
              />
              <Text style={styles.textOpt}>Gallery (MAX 20MB Per File)</Text>
            </View>
          </Pressable>
          <Pressable onPress={openCamera}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                marginTop: 30,
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1659274408/IFrameApplication/Vector_m6kxoe.png',
                }}
                style={{width: 25, height: 25}}
              />
              <Text style={styles.textOpt}>Take Photo</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setImageSelect(false)}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default CreateMessageContainer;

const styles = StyleSheet.create({
  cover: {
    width: width,
    height: height,
    zIndex: 99,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
  },
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
  },
  inputContainer: {
    width: '70%',
    position: 'relative',
  },
  photoIcon: {
    width: 30,
    height: 30,
  },
  photoIconPos: {
    position: 'absolute',
    top: 10,
    right: 10,
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
    marginLeft: 20,
    width: 50,
    height: 50,
  },
  imageContainer: {
    width: '90%',
    marginLeft: '5%',
    height: 160,
    position: 'absolute',
    bottom: 15,
    zIndex: 100,
    backgroundColor: '#1D1D1D',
    borderRadius: 20,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  textOpt: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    textTransform: 'uppercase',
    marginLeft: 20,
    color: 'white',
  },
  cancel: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    textTransform: 'uppercase',
    alignSelf: 'flex-end',
    color: 'white',
    marginTop: 10,
  },
});
