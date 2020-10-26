import React, {Component} from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar, Button, TextInput} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import AuthContext from '../components/AuthContext';
import axios from 'axios';
import URI from '../components/URI';
import SplashScreen from './SplashScreen';
import Modal from 'react-native-modal';
const areaData = require('../assets/data/areaData.json');

const DirectoryStack = createStackNavigator();

function DirectoryStackScreen({navigation, navHeaderStyles}) {
  console.log('Rendering DirectoryStackScreen');
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

class PatientDirectory extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      searchQuery: '',
      patientDetails: [],
      villageList: [],
      isLoading: true,
      modalVisibility: false,
      modalData: null,
    };
  }

  showModal = (patientData) => {
    this.setState({modalData: patientData, modalVisibility: true});
  };

  closeModal = () => {
    this.setState({modalData: null, modalVisibility: false});
  };

  patientList = () => {
    let filteredData = this.state.patientDetails;
    if (this.state.searchQuery.length !== 0) {
      filteredData = filteredData.filter((person) =>
        person.name
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase()),
      );
    }
    return filteredData.map((patient, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => this.showModal(patient)}>
          <View style={styles.cardView}>
            <View
              style={[styles.flexCenter, styles.cardTitleView, styles.flexOne]}>
              <Text style={styles.cardTitleText}>
                {patient.name} {patient.surname}
              </Text>
            </View>
            <View style={[styles.rowFlex, styles.cardBodyView]}>
              <View style={[styles.flexCenter, {flex: 3}]}>
                <Text style={styles.cardBodyText}>
                  {this.getVillageNameFromId(patient.village)}
                </Text>
              </View>
              <View style={[styles.flexCenter, {flex: 3}]}>
                <Text style={styles.cardBodyText}>{patient.phone}</Text>
              </View>
              <View style={[styles.flexCenter, styles.flexOne]}>
                <Text style={styles.cardBodyText}>{patient.PVTG}</Text>
              </View>
              <View style={[styles.flexCenter, styles.flexOne]}>
                <Text style={styles.cardBodyText}>
                  {patient.bloodgroup.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  getVillageDataForPatient(patientData) {
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
                    return [
                      areaData[i].name,
                      phcs[j].name,
                      villageSecs[k].name,
                      villages[p].name,
                    ];
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  getModal = () => {
    return (
      <Modal isVisible={this.state.modalVisibility} style={styles.modalStyle}>
        <Button mode="text" onPress={this.closeModal}>
          CLOSE
        </Button>
        <ScrollView>
          <View style={styles.flexOne}>
            <View style={styles.modalHeadingView}>
              <Text style={styles.modalHeadingText}>Basic Details</Text>
            </View>
            <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>Name</Text>
              <Text style={styles.flexOne}>
                {this.state.modalData.name} {this.state.modalData.surname}
              </Text>
            </View>
            <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>Age</Text>
              <Text style={styles.flexOne}>{this.state.modalData.age}</Text>
            </View>
            <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>
                Caste
              </Text>
              <Text style={styles.flexOne}>{this.state.modalData.PVTG}</Text>
            </View>
            <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>
                Gender
              </Text>
              <Text style={styles.flexOne}>
                {(() => {
                  switch (this.state.modalData.gender) {
                    case 'M':
                      return 'Male';
                    case 'F':
                      return 'Female';
                    case 'NB':
                      return 'Transgender';
                  }
                })()}
              </Text>
            </View>
            <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>
                Contact No.
              </Text>
              <Text style={styles.flexOne}>{this.state.modalData.phone}</Text>
            </View>
            <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>
                Blood Group
              </Text>
              <Text style={styles.flexOne}>
                {this.state.modalData.bloodgroup.toUpperCase()}
              </Text>
            </View>
            {(() => {
              let villageData = this.getVillageDataForPatient(
                this.state.modalData,
              );
              return (
                <React.Fragment>
                  <View style={styles.modalValueView}>
                    <Text style={[styles.flexOne, styles.modalValueLabel]}>
                      Mandal
                    </Text>
                    <Text style={styles.flexOne}>{villageData[0]}</Text>
                  </View>
                  <View style={styles.modalValueView}>
                    <Text style={[styles.flexOne, styles.modalValueLabel]}>
                      PHC
                    </Text>
                    <Text style={styles.flexOne}>{villageData[1]}</Text>
                  </View>
                  <View style={styles.modalValueView}>
                    <Text style={[styles.flexOne, styles.modalValueLabel]}>
                      Sub Center
                    </Text>
                    <Text style={styles.flexOne}>{villageData[2]}</Text>
                  </View>
                  <View style={styles.modalValueView}>
                    <Text style={[styles.flexOne, styles.modalValueLabel]}>
                      Village
                    </Text>
                    <Text style={styles.flexOne}>{villageData[3]}</Text>
                  </View>
                </React.Fragment>
              );
            })()}
            <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>
                Marital Status
              </Text>
              <Text style={styles.flexOne}>
                {this.state.modalData.maritalstatus.toUpperCase()}
              </Text>
            </View>
            <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>
                Guardian Name
              </Text>
              <Text style={styles.flexOne}>
                {this.state.modalData.gaurdian_name}
              </Text>
            </View>
            {/* <View style={styles.modalValueView}>
              <Text style={[styles.flexOne, styles.modalValueLabel]}>
                Address
              </Text>
              <View style={styles.flexOne}>
                <TextInput
                  mode="outlined"
                  value={this.state.modalData.address}
                  multiline
                  numberOfLines={4}
                  disabled
                  style={styles.textinput}
                />
              </View>
            </View> */}
            {/* {(() => {
              if (
                this.state.modalData.habits.smoking ||
                this.state.modalData.habits.drinking
              ) {
                let valueToShow = this.state.modalData.habits.smoking
                  ? 'Smoking'
                  : '' + ' ' + this.state.modalData.habits.drinking
                  ? 'Drinking'
                  : '';
                console.log(typeof valueToShow);
                return (
                  <React.Fragment>
                    <View style={styles.modalValueView}>
                      <Text style={[styles.flexOne, styles.modalValueLabel]}>
                        Habits
                      </Text>
                      <Text style={styles.flexOne}>Temp</Text>
                    </View>
                    ;
                  </React.Fragment>
                );
              }
            })()} */}
          </View>
        </ScrollView>
      </Modal>
    );
  };

  getVillageNameFromId = (id) => {
    // console.log("Id received " + id);
    let {villageList} = this.state;
    if (villageList.length > 0) {
      for (let i = 0; i < villageList.length; i++) {
        if (villageList[i].village_id === id) {
          return villageList[i].name;
        }
      }
    }
  };

  onChangeSearch = (query) => {
    this.setState({searchQuery: query});
  };

  fetchData = () => {
    const token = this.context.userToken.token;

    // console.log(token);
    axios
      .get(URI + 'GetAllPatient/', {headers: {Authorization: `JWT ${token}`}})
      .then((response) => {
        // console.log(response);
        this.setState({patientDetails: response.data});
        // console.log(response);
        axios
          .get(URI + 'GetAllVillage/', {
            headers: {Authorization: `JWT ${token}`},
          })
          .then((responseVillage) => {
            this.setState({
              villageList: responseVillage.data,
              isLoading: false,
            });
            // console.log(responseVillage);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.unsubscribeFocus = this.props.navigation.addListener(
      'focus',
      this.fetchData,
    );
    this.unsubscribeBlur = this.props.navigation.addListener('blur', () => {
      this.setState({
        data: '',
        searchQuery: '',
        patientDetails: [],
        villageList: [],
        isLoading: true,
      });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFocus();
    this.unsubscribeBlur();
  };

  render() {
    console.log('Rendering Directory');
    // console.log(this.state.patientDetails);
    // console.log('After patient details');
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      <View>
        <Searchbar
          placeholder="Search by name"
          onChangeText={this.onChangeSearch}
          value={this.state.searchQuery}
        />

        <ScrollView>
          <View style={{marginBottom: 40}}>{this.patientList()}</View>
        </ScrollView>
        {(() => {
          if (this.state.modalData && this.state.modalVisibility) {
            return this.getModal();
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  cardView: {
    margin: 10,
    backgroundColor: '#14213D',
    borderRadius: 10,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1,
  },
  cardBodyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  cardTitleText: {
    color: '#FCA311',
    fontWeight: 'bold',
    fontSize: 30,
  },
  cardTitleView: {
    marginVertical: 10,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  cardBodyView: {
    marginBottom: 10,
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalStyle: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
  },
  modalHeadingView: {
    borderBottomColor: '#888888',
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: '60%',
  },
  modalHeadingText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#14213D',
    fontStyle: 'italic',
  },
  modalValueLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#14213D',
  },
  modalValueView: {
    marginVertical: 5,
    flexDirection: 'row',
    flex: 1,
  },
});

PatientDirectory.contextType = AuthContext;
export default DirectoryStackScreen;
