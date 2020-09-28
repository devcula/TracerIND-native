import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

import BasicDetails from './PatientForms/BasicDetails';
import BloodProfile from './PatientForms/BloodProfile';
import TestDetails from './PatientForms/TestDetails';
import Observations from './PatientForms/Observations';
import HospitalDetails from './PatientForms/HospitalDetails';

const AddPatientStack = createStackNavigator();

class AddPatientStackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mandal: '',
    };
  }

  render() {
    let {navigation, navHeaderStyles} = this.props;
    return (
      <AddPatientStack.Navigator screenOptions={navHeaderStyles}>
        <AddPatientStack.Screen
          name="BasicDetailsForm"
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
          name="ObservationsForm"
          component={Observations}
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
        <AddPatientStack.Screen
          name="HospitalDetailsForm"
          component={HospitalDetails}
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
}

// const styles = StyleSheet.create({
//   contentScreen: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontWeight: 'bold',
//     fontSize: 30,
//   },
// });

export default AddPatientStackScreen;
