import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

const SkeletonProfile = () => {
  return (
    <View style={{marginLeft: 20}}>
      <View style={styles.up_profile}>
        <View style={styles.avatar} />
        <View style={{marginLeft: 30, justifyContent: 'center'}}>
          <View style={[styles.line, {width: 220}]} />
          <View style={[styles.line, {width: 180, marginTop: 18}]} />
          <View style={[styles.line, {width: 220, marginTop: 18}]} />
          <View style={[styles.line, {width: 180, marginTop: 18}]} />
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <View style={[styles.hl, {width: 150}]} />
        <ScrollView contentContainerStyle={styles.flex_cards} horizontal={true}>
          <View style={[styles.movieCard, {marginLeft: 0}]} />
          <View style={styles.movieCard} />
          <View style={styles.movieCard} />
          <View style={styles.movieCard} />
        </ScrollView>
      </View>
      <View style={{marginTop: 20}}>
        <View style={[styles.hl, {width: 220}]} />
        <ScrollView contentContainerStyle={styles.flex_cards} horizontal={true}>
          <View style={{alignItems: 'center', marginLeft: 0}}>
            <View style={styles.songCard} />
            <View style={styles.songTitle} />
            <View style={styles.songArtist} />
          </View>
          <View style={{alignItems: 'center', marginLeft: 20}}>
            <View style={styles.songCard} />
            <View style={styles.songTitle} />
            <View style={styles.songArtist} />
          </View>
          <View style={{alignItems: 'center', marginLeft: 20}}>
            <View style={styles.songCard} />
            <View style={styles.songTitle} />
            <View style={styles.songArtist} />
          </View>
          <View style={{alignItems: 'center', marginLeft: 20}}>
            <View style={styles.songCard} />
            <View style={styles.songTitle} />
            <View style={styles.songArtist} />
          </View>
        </ScrollView>
        <View style={styles.logoutButton} />
      </View>
    </View>
  );
};

export default SkeletonProfile;

const styles = StyleSheet.create({
  up_profile: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 20,
    width: '100%',
  },
  avatar: {
    backgroundColor: 'rgb(100, 100, 100)',
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  line: {
    backgroundColor: 'rgb(100, 100, 100)',
    height: 10,
    borderRadius: 20,
  },
  hl: {
    height: 15,
    backgroundColor: 'rgb(100, 100, 100)',
    borderRadius: 20,
  },
  flex_cards: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginTop: 20,
    paddingBottom: 15,
    paddingRight: 20,
  },
  movieCard: {
    height: 150,
    width: 130,
    backgroundColor: 'rgb(100, 100, 100)',
    borderRadius: 20,
    marginLeft: 20,
  },
  songCard: {
    height: 140,
    width: 120,
    backgroundColor: 'rgb(100, 100, 100)',
    borderRadius: 20,
  },
  songTitle: {
    backgroundColor: 'rgb(100, 100, 100)',
    width: 90,
    borderRadius: 10,
    height: 10,
    marginTop: 5,
  },
  songArtist: {
    backgroundColor: 'rgb(100, 100, 100)',
    width: 60,
    borderRadius: 10,
    height: 10,
    marginTop: 5,
  },
  logoutButton: {
    width: '96%',
    backgroundColor: 'rgb(100, 100, 100)',
    borderRadius: 15,
    height: 60,
    marginTop: 10,
  },
});
