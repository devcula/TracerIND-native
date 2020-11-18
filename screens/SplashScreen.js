import React from 'react';

import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {MontserratFont} from '../components/Constants';

export default function SplashScreen() {
  return (
    <View style={styles.contentScreen}>
      <ActivityIndicator size="large" color="#14213D" />
      <Text style={styles.text}>Loading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...MontserratFont.bold,
    fontSize: 30,
  },
});
