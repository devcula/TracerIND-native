import React from 'react';

import {SafeAreaView, ScrollView, View, Text, Button} from 'react-native';

export default function HomeScreen(props) {
  return (
    <React.Fragment>
      <View>
        <Text>Home Screen</Text>
      </View>
      {/* <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.cardStyle}>
            <Text style={[styles.whiteText, styles.center]}>Home Screen</Text>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Go to About Us"
              onPress={() => props.navigation.navigate('AboutUs')}
            />
          </View>
        </ScrollView>
      </SafeAreaView> */}
    </React.Fragment>
  );
}
