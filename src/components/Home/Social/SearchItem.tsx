import React, {useState, FC} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';

import {addFriend as addFriendConnect} from '../../../actions/socialActions';

interface Item {
  email: string;
  onSuccess: () => void;
  addFriend: (dispatch: any) => void;
  pfp: string;
}

const SearchItem: FC<Item> = ({email, onSuccess, addFriend, pfp}) => {
  const [loading, setLoading] = useState(false);

  const onFinish = () => {
    setLoading(false);
  };

  const addPerson = (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      addFriend({email, onSuccess, onFinish});
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: pfp,
        }}
        style={styles.img}
      />

      <ScrollView
        horizontal={true}
        style={{backgroundColor: 'rgba(99, 99, 99, 0)', marginRight: 10}}>
        <Text style={styles.text} numberOfLines={1}>
          {email}
        </Text>
      </ScrollView>
      {!loading ? (
        <Pressable onPress={addPerson}>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658709253/MessagingApp/green-add-button-12023_cnddb8.png',
            }}
            style={styles.button}
          />
        </Pressable>
      ) : (
        <ActivityIndicator color={'#1A73E8'} size={'large'} />
      )}
    </View>
  );
};

export default connect(() => ({}), {addFriend: addFriendConnect})(SearchItem);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#414141',
    height: 84,
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'relative',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 25,
  },
  text: {
    position: 'relative',
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 16,
    color: 'white',
    overflow: 'visible',
    paddingBottom: 10,
    minWidth: 170,
    top: 3,
  },
  button: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
});
