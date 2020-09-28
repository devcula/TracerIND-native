import React from 'react';

import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

const AddPatientStack = createStackNavigator();

function AddPatientStackScreen({navigation, navHeaderStyles}) {
  return (
    <AddPatientStack.Navigator
      initialRouteName="AddPatient"
      screenOptions={navHeaderStyles}>
      <AddPatientStack.Screen
        name="AddPatient"
        component={BasicDetails}
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
      <AddPatientStack.Screen
        name="BloodProfileForm"
        component={BloodProfile}
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
      <AddPatientStack.Screen
        name="TestDetailsForm"
        component={TestDetails}
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

class BasicDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mandal: '',
      phc: '',
      village_sec: '',
      vilage: '',
    };
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>Basic details</Text>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('BloodProfileForm')}>
            Next
          </Button>
        </View>
      </ScrollView>
    );
  }
}

class BloodProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mandal: '',
      phc: '',
      village_sec: '',
      vilage: '',
    };
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>Blood Profile</Text>
        </View>
        <Button mode="contained" onPress={() => this.props.navigation.goBack()}>
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={() => this.props.navigation.navigate('TestDetailsForm')}>
          Next
        </Button>
      </ScrollView>
    );
  }
}

class TestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mandal: '',
      phc: '',
      village_sec: '',
      vilage: '',
    };
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>Test Details</Text>
        </View>
        <Button mode="contained" onPress={() => this.props.navigation.goBack()}>
          Previous
        </Button>
        <Button mode="contained" onPress={() => {}}>
          Next
        </Button>
      </ScrollView>
    );
  }
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
