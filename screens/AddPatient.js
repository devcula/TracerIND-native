import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

const AddPatientStack = createStackNavigator();

function AddPatientStackScreen({navigation, navHeaderStyles}) {
  return (
    <AddPatientStack.Navigator screenOptions={navHeaderStyles}>
      <AddPatientStack.Screen
        name="AddPatient"
        component={AddPatient}
        options={{
          title: 'Add new Patient',
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
    </AddPatientStack.Navigator>
  );
}

function AddPatient(props) {
  return (
    <React.Fragment>
      <View style={styles.contentScreen}>
        <Text style={styles.text}>Add New Patient</Text>
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

export default AddPatientStackScreen;
