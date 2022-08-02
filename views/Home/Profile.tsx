import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Header from '../../src/components/Home/Header';
import BackArrow from '../../src/components/Home/BackArrow';
import SkeletonProfile from '../../src/components/Home/Skeletons/SkeletonProfile';
import {server} from '../../src/config/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {logout as logoutUserConnect} from '../../src/actions/authActions';

const Profile = ({
  pfp,
  username,
  email,
  logoutUser,
}: {
  pfp: string;
  username: string;
  email: string;
  logoutUser: ({onSuccess}: {onSuccess: () => void}) => void;
}) => {
  const [movies, setMovies] = useState([]);
  const [songs, setSongs] = useState([]);
  const [quote, setQuote] = useState({author: '', text: ''});
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const _movies = (
          await axios.get(`${server}/api/profile/get-movies`, {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          })
        ).data.movies;
        const _songs = (
          await axios.get(`${server}/api/profile/get-songs`, {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          })
        ).data.songs;
        const _quote = (
          await axios.get(`${server}/api/profile/get-quote`, {
            withCredentials: true,
            headers: {
              Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
            },
          })
        ).data;

        setMovies(_movies);
        setSongs(_songs);
        setQuote({text: _quote.text, author: _quote.author});
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getData().then();
  }, []);

  const logout = async () => {
    try {
      setLogoutLoading(true);
      await axios.post(
        `${server}/api/miscellaneous/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Cookie: `auth-token=${await AsyncStorage.getItem('auth-token')};`,
          },
        },
      );
      const onSuccess = () => {
        setLogoutLoading(false);
      };
      logoutUser({onSuccess});
    } catch (err) {
      setLogoutLoading(false);
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <Header
        text={'Profile'}
        Action={BackArrow}
        SecondAction={View}
        backColor={'#1D1D1D'}
      />
      {loading ? (
        <SkeletonProfile />
      ) : (
        <View style={{marginLeft: 20}}>
          <View style={styles.up_profile}>
            <Image
              style={styles.avatar}
              source={{
                uri: pfp,
              }}
            />
            <View style={{marginLeft: 30, justifyContent: 'center'}}>
              <Text style={styles.line}>{username}</Text>
              <ScrollView
                horizontal={true}
                style={{
                  backgroundColor: 'rgba(99, 99, 99, 0)',
                  width: 230,
                }}>
                <Text style={styles.email} numberOfLines={1}>
                  {email}
                </Text>
              </ScrollView>
              {quote.text !== '' && (
                <>
                  <View style={styles.divider} />
                  <View style={{marginTop: 8}}>
                    <ScrollView
                      style={{
                        width: 220,
                        backgroundColor: 'rgb(50, 50, 50, 0)',
                        maxHeight: 50,
                      }}>
                      <Text style={styles.quote}>{quote.text}</Text>
                    </ScrollView>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                      }}>
                      <ScrollView
                        style={{
                          width: 180,
                          marginLeft: 50,
                          backgroundColor: 'rgb(50, 50, 50, 0)',
                        }}
                        horizontal={true}>
                        <Text style={styles.quoteAuthor} numberOfLines={1}>
                          by {quote.author}
                        </Text>
                      </ScrollView>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.hl}>Favorite Movies</Text>
            <ScrollView
              contentContainerStyle={styles.flex_cards}
              horizontal={true}>
              {movies.length > 0 ? (
                movies.map((movie: any, key: number) => {
                  return (
                    <Image
                      key={key}
                      style={
                        key === 0
                          ? [styles.movieCard, {marginLeft: 0}]
                          : styles.movieCard
                      }
                      source={{
                        uri: movie.img,
                      }}
                    />
                  );
                })
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResults}>No results found</Text>
                </View>
              )}
            </ScrollView>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.hl}>Favorite Songs</Text>
            <ScrollView
              contentContainerStyle={styles.flex_cards}
              horizontal={true}>
              {songs.length > 0 ? (
                songs.map((song: any, key: number) => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        marginLeft: key === 0 ? 0 : 20,
                      }}
                      key={key}>
                      <Image
                        style={[styles.songCard, {marginLeft: 0}]}
                        source={{
                          uri: song.img,
                        }}
                      />
                      <ScrollView
                        nestedScrollEnabled={true}
                        style={{
                          width: 90,
                          height: 45,
                          backgroundColor: 'rgb(50, 50, 50, 0)',
                        }}
                        contentContainerStyle={{alignItems: 'center'}}>
                        <Text style={styles.songTitle}>{song.title}</Text>
                        <Text style={styles.songArtist}>{song.artist}</Text>
                      </ScrollView>
                    </View>
                  );
                })
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResults}>No results found</Text>
                </View>
              )}
            </ScrollView>
          </View>
          {!logoutLoading ? (
            <Pressable onPress={logout}>
              <View style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </Pressable>
          ) : (
            <View>
              <ActivityIndicator color={'#E81A1A'} size={70} />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default connect(
  (state: any) => ({
    pfp: state.auth.pfp,
    username: state.auth.username,
    email: state.auth.email,
  }),
  {logoutUser: logoutUserConnect},
)(Profile);

const deviceWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  up_profile: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 20,
    width: '100%',
    overflow: 'visible',
  },
  avatar: {
    backgroundColor: 'rgb(100, 100, 100)',
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  line: {
    color: 'white',
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 24,
    textTransform: 'uppercase',
  },
  email: {
    fontFamily: 'Inter',
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 2,
    color: 'white',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
  },
  quote: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  quoteAuthor: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
    color: 'white',
    textTransform: 'uppercase',
  },
  hl: {
    color: 'white',
    fontWeight: '900',
    fontSize: 20,
    fontFamily: 'Inter',
    textTransform: 'uppercase',
  },
  flex_cards: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginTop: 20,
    paddingBottom: 15,
    paddingRight: 20,
    overflow: 'scroll',
  },
  movieCard: {
    height: 160,
    width: 140,
    borderRadius: 20,
    marginLeft: 20,
  },
  songCard: {
    height: 140,
    width: 120,
    borderRadius: 20,
    marginLeft: 20,
  },
  songTitle: {
    marginTop: 5,
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 14,
    textTransform: 'uppercase',
    color: 'white',
    width: 90,
    textAlign: 'center',
  },
  songArtist: {
    marginTop: 5,
    fontFamily: 'Inter',
    fontWeight: '900',
    fontSize: 10,
    textTransform: 'uppercase',
    color: '#B0B0B0',
    overflow: 'visible',
    width: 60,
    textAlign: 'center',
  },
  logoutButton: {
    width: '96%',
    backgroundColor: '#E81A1A',
    borderRadius: 15,
    height: 60,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 28,
    fontWeight: '900',
    fontFamily: 'Inter',
  },
  noResultsContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth - 40,
    paddingHorizontal: 20,
    height: 140,
  },
  noResults: {
    color: 'rgb(100, 100, 100)',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontFamily: 'Inter',
    fontSize: 30,
  },
});
