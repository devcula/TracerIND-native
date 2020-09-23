import React from 'react';

import {View, Text} from 'react-native';

export default function AboutUs(props) {
  return (
    <React.Fragment>
      <View>
        <Text>About Us</Text>
      </View>
      {/* <SafeAreaView>
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
      </SafeAreaView> */}
    </React.Fragment>
  );
}
