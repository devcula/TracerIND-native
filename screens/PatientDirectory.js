import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

const DirectoryStack = createStackNavigator();

function DirectoryStackScreen({navigation, navHeaderStyles}) {
  return (
    <DirectoryStack.Navigator screenOptions={navHeaderStyles}>
      <DirectoryStack.Screen
        name="PatientDirectory"
        component={PatientDirectory}
        options={{
          title: 'Patient Directory',
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
    </DirectoryStack.Navigator>
  );
}

function PatientDirectory() {
  return (
    <View style={styles.contentScreen}>
      <Text style={styles.text}>Patient Directory</Text>
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

export default DirectoryStackScreen;
