import React from 'react';

import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

export default function HomeScreen() {
  return (
    <React.Fragment>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.cardStyle}>
            <Text style={[styles.whiteText, styles.center]}>Home Screen</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  center: {
    textAlign: 'center',
  },
  cardStyle: {
    margin: 10,
    padding: 10,
    backgroundColor: '#14213D',
  },
  ourFont: {
    fontFamily: 'Montserrat-Medium',
  },
  scrollView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
});
