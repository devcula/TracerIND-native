import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

import BasicDetails from './PatientForms/BasicDetails';
import BloodProfile from './PatientForms/BloodProfile';
import TestDetails from './PatientForms/TestDetails';
import Observations from './PatientForms/Observations';
import HospitalDetails from './PatientForms/HospitalDetails';

import PatientContext from '../components/PatientContext';
import AsyncStorage from '@react-native-community/async-storage';

import initialState from '../components/InitialPatientData';
const AddPatientStack = createStackNavigator();

class AddPatientStackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pkid: this.generatePkid(32),
      ...initialState,
    };
  }

  generatePkid = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  appendState = (childState, callback) => {
    let currentState = {...this.state};
    if (callback) {
      this.setState(
        {
          ...currentState,
          ...childState,
        },
        callback(),
      );
    } else {
      this.setState(childState);
    }
  };

  getValue = (key) => {
    return this.state[key] === undefined ? '' : this.state[key];
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.reset();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  reset = () => {
    this.setState({pkid: this.generatePkid(32), ...initialState});
  };

  savePatient = async (successCallback, failedCallback) => {
    let opdCheck = false;
    let dialysisCheck = false;
    let doctorreqCheck = false;
    if (this.state.kidneystatus === 'abnormal') {
      if (this.state.dialysis === 'true') {
        dialysisCheck = true;
      }
    } else if (this.state.kidneystatus === 'good') {
      dialysisCheck = false;
    }

    if (this.state.kidneystatus === 'abnormal') {
      if (this.state.doctorreq === 'true') {
        doctorreqCheck = true;
      }
    } else if (this.state.kidneystatus === 'good') {
      doctorreqCheck = false;
    }

    if (
      this.state.kidneystatus === 'good' ||
      this.state.doctorreq === 'false'
    ) {
      opdCheck = false;
    } else if (
      this.state.kidneystatus === 'abnormal' &&
      this.state.doctorreq === 'true'
    ) {
      opdCheck = true;
    }
    let dataToSave = {
      pkid: this.state.pkid,
      adhaar: '',
      mandal: this.state.mandal,
      phc: this.state.phc,
      villagesec: this.state.village_sec,
      village: this.state.village,
      name: this.state.name,
      surname: this.state.surname,
      relation: this.state.relation,
      gaurdian_name: this.state.gaurdian_name,
      age: this.state.age,
      gender: this.state.gender,
      maritalstatus: this.state.maritalstatus,
      phone: this.state.phone,
      bloodgroup: this.state.bloodgroup,
      PVTG: this.state.PVTG,
      dateoftesting: this.state.dateoftesting ? this.state.dateoftesting : '',
      serumCreatinine: this.state.serumCreatinine
        ? this.state.serumCreatinine
        : 0,
      bloodUrea: this.state.bloodUrea ? this.state.bloodUrea : 0,
      uricAcid: this.state.uricAcid ? this.state.uricAcid : 0,
      electrolytes_sodium: this.state.electrolytes_sodium
        ? this.state.electrolytes_sodium
        : 0,
      electrolytes_potassium: this.state.electrolytes_potassium
        ? this.state.electrolytes_potassium
        : 0,
      bun: this.state.bun ? this.state.bun : 0,
      pedalEdema: this.state.pedalEdema ? this.state.pedalEdema : '',
      pedaltype: this.state.pedalEdema === 'N' ? '' : this.state.pedaltype,
      kidneystatus:
        this.state.kidneystatus !== undefined ? this.state.kidneystatus : '',
      ailments: this.state.kidneystatus === 'good' ? '' : this.state.ailments,
      dialysis: dialysisCheck,
      doctorreq: doctorreqCheck,
      hospitalAdmit:
        this.state.hospitalAdmit !== undefined ? this.state.hospitalAdmit : '',
      dateOfAdmit:
        this.state.dateOfAdmit !== undefined ? this.state.dateOfAdmit : '',
      refered: this.state.refered ? this.state.refered : false,
      referredto: this.state.referred === 'yes' ? this.state.referredto : '',
      ref_status: this.state.referred === 'yes' ? this.state.status : '',
      treatmentDone:
        this.state.referred === 'yes' ? this.state.treatmentDone : '',
      discharge: this.state.referred === 'no' ? this.state.discharge : '',
      dischargeStatus:
        this.state.referred === 'no' ? this.state.dischargeStatus : '',
      deceased: this.state.referred === 'no' ? this.state.deceased : false,
      deathDate: this.state.deceased === 'yes' ? this.state.deathDate : '',
      placeOfDeath:
        this.state.deceased === 'yes' ? this.state.placeOfDeath : '',
      causeOfDeath:
        this.state.deceased === 'yes' ? this.state.causeOfDeath : '',
      deworming: this.state.deworming ? this.state.deworming : false,
      type_data: process.env.NODE_ENV,
      opd: opdCheck,
      weight: this.state.weight ? this.state.weight : 0.0,
      height: this.state.height ? this.state.height : 0.0,
      BasicVitals: {
        Temperature: this.state.temperature,
        BP: this.state.bloodpressure,
        HR: this.state.heartrate,
        Pulse: this.state.pulserate,
        RespRate: this.state.respiratoryrate,
      },
      BasicSymptoms: {
        Fever: this.state.fever,
        Cold: this.state.cold,
        Cough: this.state.cough,
        Fatigue: this.state.fatigue,
        Aches: this.state.aches,
        Diarrohea: this.state.diarrohea,
        Bleeding: this.state.bleeding,
        Infection: this.state.infection,
        others: this.state.otherSymptoms,
      },
      report: {},
      patient_status: 'Closed',
      hb: this.state.haemoglobin ? this.state.haemoglobin : 0.0,
      wbc_count: this.state.wbc ? this.state.wbc : 0.0,
      diffrential_count: {
        monocytes: this.state.monocytes ? this.state.monocytes : null,
        lymphocytes: this.state.lymphocytes ? this.state.lymphocytes : null,
        eosinophils: this.state.eosinophils ? this.state.eosinophils : null,
      },
      plat_count: this.state.platelet ? this.state.platelet : 0.0,
      habits: {
        smoking: this.state.smoking,
        drinking: this.state.drinking,
      },
    };
    try {
      let patientsData = await AsyncStorage.getItem('savedPatientsData');
      if (patientsData === null) {
        patientsData = [];
        patientsData.push(dataToSave);
      } else {
        patientsData = JSON.parse(patientsData);
        patientsData.push(dataToSave);
      }
      await AsyncStorage.setItem(
        'savedPatientsData',
        JSON.stringify(patientsData),
      );
      successCallback();
      this.reset();
    } catch (error) {
      failedCallback();
    }
  };

  render() {
    console.log('Rendering AddPatientStackScreen');
    let {navigation, navHeaderStyles} = this.props;
    return (
      <PatientContext.Provider
        value={{
          getValue: this.getValue,
          saveDataToParent: this.appendState,
          resetForm: this.reset,
          submitForm: this.savePatient,
        }}>
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
      </PatientContext.Provider>
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
