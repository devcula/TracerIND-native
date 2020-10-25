import React from 'react';

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-elements';
import {Button} from 'react-native-paper';
import SplashScreen from './SplashScreen';

import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import URI from '../components/URI';
const areaData = require('../assets/data/areaData.json');

const LocalListStack = createStackNavigator();

function LocalPatientListStackScreen({navigation, navHeaderStyles, userToken}) {
  console.log('Rendering LocalPatientListStackScreen');
  return (
    <LocalListStack.Navigator screenOptions={navHeaderStyles}>
      <LocalListStack.Screen
        name="LocalPatientList"
        options={{
          title: 'Patient data(Local)',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#14213D"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}>
        {(props) => <LocalPatientList {...props} userToken={userToken} />}
      </LocalListStack.Screen>
    </LocalListStack.Navigator>
  );
}

function getVillageNameForPatient(patientData) {
  // console.log(patientData);
  for (let i = 0; i < areaData.length; i++) {
    if (patientData.mandal === areaData[i].id) {
      let phcs = areaData[i].phcs;
      for (let j = 0; j < phcs.length; j++) {
        if (patientData.phc === phcs[j].PHC_id) {
          let villageSecs = phcs[j].villageSecs;
          for (let k = 0; k < villageSecs.length; k++) {
            if (patientData.villagesec === villageSecs[k].villagesec_id) {
              let villages = villageSecs[k].villages;
              for (let p = 0; p < villages.length; p++) {
                if (villages[p].village_id === patientData.village) {
                  return villages[p].name;
                }
              }
            }
          }
        }
      }
    }
  }
}

function LocalPatientList(props) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'LOAD_DATA':
          return {
            ...prevState,
            patientsData: action.patientsData ? action.patientsData : [],
            loading: false,
          };
        case 'BLUR':
          return {
            ...prevState,
            loading: true,
            patientsData: [],
            isSynchronizing: false,
          };
        case 'START_SYNC':
          return {
            ...prevState,
            isSynchronizing: true,
          };
        case 'STOP_SYNC':
          return {
            ...prevState,
            isSynchronizing: false,
          };
      }
    },
    {
      loading: true,
      patientsData: [],
      isSynchronizing: false,
    },
  );

  React.useEffect(() => {
    let blurUnsubscribe = props.navigation.addListener('blur', () => {
      dispatch({type: 'BLUR'});
    });

    let focusUnsubscribe = props.navigation.addListener(
      'focus',
      loadPatientsData,
    );

    async function loadPatientsData() {
      try {
        let data = await AsyncStorage.getItem('savedPatientsData');
        // console.log(data);
        if (data !== null) {
          dispatch({type: 'LOAD_DATA', patientsData: JSON.parse(data)});
        } else {
          dispatch({type: 'LOAD_DATA'});
        }
      } catch (error) {
        console.log(error);
        alert('Some error occured');
        dispatch({type: 'LOAD_DATA'});
      }
    }

    return function cleanup() {
      blurUnsubscribe();
      focusUnsubscribe();
    };
  });

  const syncDataToCloud = async () => {
    // console.log(props);
    if (props.userToken === null) {
      props.navigation.navigate('Login');
    } else {
      try {
        dispatch({type: 'START_SYNC'});
        let dataToSync = state.patientsData;
        for (let i = dataToSync.length - 1; i >= 0; i--) {
          await new Promise((resolve) => {
            axios
              .post(URI + 'AddPatient/', dataToSync[i], {
                headers: {Authorization: `JWT ${props.userToken.token}`},
              })
              .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                  return response.data;
                }
              })
              .then((data) => {
                //Do some manipulation with data if needed
                if (dataToSync[i].pkid === data.pkid) {
                  dataToSync.splice(i, 1);
                }
                resolve();
              })
              .catch((err) => {
                console.log(JSON.stringify(err.response.data));
                resolve();
              });
          });
        }
        await AsyncStorage.setItem(
          'savedPatientsData',
          JSON.stringify(dataToSync),
        );
        dispatch({type: 'LOAD_DATA', patientsData: dataToSync});
        dispatch({type: 'STOP_SYNC'});
      } catch (error) {
        alert('Failed to upload');
      }
    }
  };

  console.log('Rendering LocalPatientList');

  if (state.loading) {
    return <SplashScreen />;
  } else if (state.patientsData.length === 0) {
    return (
      <View style={styles.contentScreen}>
        <Text style={styles.text}>Nothing here...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          {state.patientsData.map((patient, i) => {
            return (
              <Card key={i} style={styles.card}>
                <Text style={styles.cardTitle}>
                  {patient.name + ' ' + patient.surname}
                </Text>
                <View style={styles.cardBody}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        flex: 3,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      Village
                    </Text>
                    <Text
                      style={{
                        flex: 3,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      Phone
                    </Text>
                    <Text
                      style={{
                        flex: 2,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      Caste
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      BG
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{flex: 3, textAlign: 'center'}}>
                      {getVillageNameForPatient(patient)}
                    </Text>
                    <Text style={{flex: 3, textAlign: 'center'}}>
                      {patient.phone}
                    </Text>
                    <Text style={{flex: 2, textAlign: 'center'}}>
                      {patient.PVTG}
                    </Text>
                    <Text style={{flex: 1, textAlign: 'center'}}>
                      {patient.bloodgroup.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}>
          <Button
            loading={state.isSynchronizing}
            mode="contained"
            icon="sync"
            style={styles.FloatingButtonStyle}
            onPress={syncDataToCloud}>
            <Text style={styles.syncButtonText}>UPLOAD</Text>
          </Button>
        </TouchableOpacity>
      </View>
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
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#14213D',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  cardBody: {
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#14213D',
  },
  syncButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 10,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
  },
  MainContainer: {
    flex: 1,
  },
});

export default LocalPatientListStackScreen;
