import React, {FC, useState, useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import Header from '../../../src/components/Home/Header';
import BackArrow from '../../../src/components/Home/BackArrow';
import {SocialRedux} from '../../../src/typings';
import {
  resetPeopleSearch as resetPeopleSearchConnect,
  updateFriends as updateFriendsConnect,
} from '../../../src/actions/socialActions';
import {connect} from 'react-redux';
import SkeletonFriend from '../../../src/components/Home/Skeletons/SkeletonFriend';
import Search from '../../../src/components/Home/Search';
import Friend from '../../../src/components/Home/Social/Friend';
import AddFriend from '../../../src/components/Home/Social/Actions/AddFriend';

const Friends: FC<
  Omit<
    SocialRedux,
    | 'peopleSearch'
    | 'psLoading'
    | 'showPeopleSearch'
    | 'showFriendRequests'
    | 'friendRequests'
  >
> = ({resetPeopleSearch, friends, updateFriends, loading}) => {
  const [search, setSearch] = useState('');
  const allFriends = friends;
  const [_friends, setFriends] = useState<any>(allFriends);

  useEffect(() => {
    resetPeopleSearch({});
  }, [search]);

  useEffect(() => {
    updateFriends();
  }, []);

  useEffect(() => {
    if (allFriends) {
      setFriends(allFriends);
    }
  }, [allFriends]);

  return (
    <View>
      <Header text={'Friends'} Action={BackArrow} SecondAction={AddFriend} />
      <Search search={search} setSearch={setSearch} />

      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {_friends && parseInt(_friends.length) > 0 && (
          <>
            {!loading ? (
              <>
                {_friends
                  .filter((f: any) => f.email.startsWith(search))
                  .map(
                    (
                      person: {
                        email: string;
                        username: string;
                        blocked: boolean;
                        friendId: string;
                        pfp: string | undefined;
                      },
                      key: number,
                    ) => {
                      console.log(person);
                      return (
                        <Friend
                          key={key + 10}
                          friendId={person.friendId}
                          blocked={person.blocked}
                          email={person.email}
                          name={person.username}
                          pfp={person.pfp}
                        />
                      );
                    },
                  )}
              </>
            ) : (
              <>
                <SkeletonFriend />
                <SkeletonFriend />
                <SkeletonFriend />
                <SkeletonFriend />
              </>
            )}
          </>
        )}
      </ScrollView>

      {_friends && _friends.length === 0 && !loading && (
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text style={styles.notFound}>No results found</Text>
        </View>
      )}
    </View>
  );
};

export default connect(
  (state: any) => ({
    friends: state.social.friends,
    loading: state.social.loading,
  }),
  {
    updateFriends: updateFriendsConnect,
    resetPeopleSearch: resetPeopleSearchConnect,
  },
)(Friends);

const styles = StyleSheet.create({
  notFound: {
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 36,
    textTransform: 'uppercase',
    color: 'rgb(150, 150, 150)',
  },
});
