import React from 'react';

import {ScrollView, View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

const LocalListStack = createStackNavigator();

function LocalPatientListStackScreen({navigation, navHeaderStyles}) {
  return (
    <LocalListStack.Navigator screenOptions={navHeaderStyles}>
      <LocalListStack.Screen
        name="Login"
        component={LocalPatientList}
        options={{
          title: 'Login',
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
    </LocalListStack.Navigator>
  );
}

function LocalPatientList() {
  return (
    <ScrollView contentContainerStyle={styles.contentScreen}>
      <View>
        <Text style={styles.text}>Patient List</Text>
      </View>
    </ScrollView>
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

export default LocalPatientListStackScreen;
