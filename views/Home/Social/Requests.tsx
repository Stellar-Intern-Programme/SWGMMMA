import React, {useState, useEffect, FC} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import Header from '../../../src/components/Home/Header';
import Friend from '../../../src/components/Home/Social/Actions/Friend';
import BackArrow from '../../../src/components/Home/BackArrow';
import Search from '../../../src/components/Home/Search';
import SkeletonFriend from '../../../src/components/Home/Skeletons/SkeletonFriend';
import {connect} from 'react-redux';
import {
  resetPeopleSearch as resetPeopleSearchConnect,
  showFriendRequests as showFriendRequestsConnect,
} from '../../../src/actions/socialActions';
import {SocialRedux} from '../../../src/typings';
import Request from '../../../src/components/Home/Social/Request';

const Requests: FC<
  Omit<
    SocialRedux,
    | 'peopleSearch'
    | 'updateFriends'
    | 'psLoading'
    | 'friends'
    | 'showPeopleSearch'
  >
> = ({resetPeopleSearch, showFriendRequests, friendRequests, loading}) => {
  const [search, setSearch] = useState('');

  const allFriendRequests = friendRequests;
  const [_friendRequests, setFriendRequests] = useState(allFriendRequests);

  useEffect(() => {
    if (allFriendRequests) {
      setFriendRequests(allFriendRequests);
    }
  }, [allFriendRequests]);

  useEffect(() => {
    showFriendRequests();
    resetPeopleSearch();
  }, []);

  return (
    <View>
      <Header Action={BackArrow} text={'Requests'} SecondAction={Friend} />
      <Search setSearch={setSearch} search={search} />

      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        keyboardShouldPersistTaps="handled">
        {_friendRequests && _friendRequests.length > 0 && (
          <>
            {!loading ? (
              <>
                {_friendRequests
                  .filter((fr: any) =>
                    fr.email.toLowerCase().startsWith(search.toLowerCase()),
                  )
                  .map(
                    (
                      person: {email: string; username: string; pfp: string},
                      key: number,
                    ) => {
                      return (
                        <Request
                          key={key}
                          email={person.email}
                          name={person.username}
                          pfp={person.pfp}
                          setFriendRequests={setFriendRequests}
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

      {_friendRequests && _friendRequests.length === 0 && !loading && (
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text style={styles.notFound}>No results found</Text>
        </View>
      )}
    </View>
  );
};

export default connect(
  (state: any) => ({
    friendRequests: state.social.friendRequests,
    loading: state.social.loading,
  }),
  {
    resetPeopleSearch: resetPeopleSearchConnect,
    showFriendRequests: showFriendRequestsConnect,
  },
)(Requests);

const styles = StyleSheet.create({
  notFound: {
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 36,
    textTransform: 'uppercase',
    color: 'rgb(150, 150, 150)',
  },
});
