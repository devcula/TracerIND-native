import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

const AboutUsStack = createStackNavigator();

function AboutUsStackScreen({navigation, navHeaderStyles}) {
  return (
    <AboutUsStack.Navigator screenOptions={navHeaderStyles}>
      <AboutUsStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'Meet our team',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#14213D"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </AboutUsStack.Navigator>
  );
}

function AboutUs(props) {
  return (
    <React.Fragment>
      <View style={styles.contentScreen}>
        <Text style={styles.text}>About Us</Text>
      </View>
    </React.Fragment>
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

export default AboutUsStackScreen;
