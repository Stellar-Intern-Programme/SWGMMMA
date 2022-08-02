import React, {useState, useEffect, FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../../src/components/Home/Header';
import Request from '../../../src/components/Home/Social/Actions/Request';
import BackArrow from '../../../src/components/Home/BackArrow';
import {connect} from 'react-redux';
import {
  showPeopleSearch as showPeopleSearchConnect,
  resetPeopleSearch as resetPeopleSearchConnect,
} from '../../../src/actions/socialActions';
import {SocialRedux} from '../../../src/typings';
import Search from '../../../src/components/Home/Search';
import SearchItemSkeleton from '../../../src/components/Home/Skeletons/SearchItemSkeleton';
import SearchItem from '../../../src/components/Home/Social/SearchItem';

const AddFriends: FC<
  Omit<
    SocialRedux,
    | 'friends'
    | 'loading'
    | 'showFriendRequests'
    | 'friendRequests'
    | 'updateFriends'
  >
> = ({peopleSearch, showPeopleSearch, psLoading, resetPeopleSearch}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    showPeopleSearch({email: search});
  }, [search, showPeopleSearch]);

  const onSuccess = () => {
    setSearch('');
    resetPeopleSearch({});
  };

  return (
    <View>
      <Header Action={BackArrow} text={'Add Friends'} SecondAction={Request} />
      <Search setSearch={setSearch} search={search} />
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {peopleSearch && peopleSearch.length > 0 && !psLoading && search !== ''
          ? peopleSearch.map((p: any, key: number) => {
              console.log(p);
              return (
                <SearchItem
                  key={key}
                  email={p.email}
                  onSuccess={onSuccess}
                  pfp={p.pfp}
                />
              );
            })
          : psLoading &&
            search !== '' && (
              <>
                <SearchItemSkeleton />
                <SearchItemSkeleton />
                <SearchItemSkeleton />
                <SearchItemSkeleton />
              </>
            )}
      </ScrollView>

      {((peopleSearch && peopleSearch.length === 0 && !psLoading) ||
        search === '') && (
        <View style={{alignItems: 'center', marginTop: 50}}>
          <Text style={styles.notFound}>No results found</Text>
        </View>
      )}
    </View>
  );
};

export default connect(
  (state: any) => ({
    peopleSearch: state.social.peopleSearch,
    psLoading: state.social.psLoading,
  }),
  {
    showPeopleSearch: showPeopleSearchConnect,
    resetPeopleSearch: resetPeopleSearchConnect,
  },
)(AddFriends);

const styles = StyleSheet.create({
  notFound: {
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 36,
    textTransform: 'uppercase',
    color: 'rgb(150, 150, 150)',
  },
});
