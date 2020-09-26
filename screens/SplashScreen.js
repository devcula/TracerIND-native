import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.contentScreen}>
      <Text style={styles.text}>Loading...</Text>
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
    fontWeight: 'bold',
    fontSize: 30,
  },
});
