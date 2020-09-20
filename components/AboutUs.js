import React from 'react';

import {SafeAreaView, ScrollView, View, Text, Button} from 'react-native';

export default function AboutUs(props) {
  const {styles} = props;

  return (
    <React.Fragment>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.cardStyle}>
            <Text style={[styles.whiteText, styles.center]}>About Us</Text>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Go to Home"
              onPress={() => props.navigation.navigate('Home')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
}
