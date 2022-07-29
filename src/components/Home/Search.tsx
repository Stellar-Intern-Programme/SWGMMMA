import React, {FC, Dispatch, SetStateAction} from 'react';
import {View, TextInput, StyleSheet, Image} from 'react-native';

interface Props {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}

const Search: FC<Props> = ({setSearch, search}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={newValue => setSearch(newValue)}
        style={styles.input}
        placeholder={'Search'}
        placeholderTextColor={'white'}
      />
      <Image
        style={styles.icon}
        source={{
          uri: 'https://res.cloudinary.com/multimediarog/image/upload/v1658389595/IFrameApplication/asdasd_xetlkb.png',
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#2E2E2E',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 60,
  },
  input: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '70%',
    bottom: 10,
    color: 'white',
    paddingBottom: 0,
  },
  icon: {
    position: 'absolute',
    right: 65,
    bottom: 17,
    width: 20,
    height: 20,
  },
});
