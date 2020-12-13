import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';
import {MontserratFont} from '../components/Constants';
import SplashScreen from './SplashScreen';

import axios from 'axios';
import URI from '../components/URI';
import {diseaseList, patientCategories} from '../components/Constants';

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation, navHeaderStyles, isSignedIn, userToken}) {
  console.log('Rendering HomeStackScreen');
  return (
    <HomeStack.Navigator screenOptions={navHeaderStyles}>
      <HomeStack.Screen
        name="Home"
        options={{
          title: 'Girijana Arogaya Pragathi',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#14213D"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}>
        {(props) => (
          <HomeScreen
            {...props}
            isSignedIn={isSignedIn}
            userToken={userToken}
          />
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      areaName: 'NA',
      areaType: 'NA',
      severeCount: 'XXX',
      moderateCount: 'XXX',
      mildCount: 'XXX',
      totalCount: 'XXX',
      disease1: {
        name: 'Disease 1',
        count: 'XXX',
      },
      disease2: {
        name: 'Disease 2',
        count: 'XXX',
      },
      disease3: {
        name: 'Disease 3',
        count: 'XXX',
      },
      disease4: {
        name: 'Disease 4',
        count: 'XXX',
      },
      disease5: {
        name: 'Disease 5',
        count: 'XXX',
      },
    };
  }

  getDiseaseName = (diseaseValue) => {
    for (let i = 0; i < diseaseList.length; i++) {
      if (diseaseValue === diseaseList[i].value) {
        return diseaseList[i].label;
      }
    }
  };

  componentDidMount() {
    if (this.props.isSignedIn) {
      this.setState({isLoading: true});
      axios
        .get(URI + 'GetAllPatient/', {
          headers: {Authorization: `JWT ${this.props.userToken.token}`},
        })
        .then((response) => {
          if (response.status === 200) {
            let {data} = response;
            let severe = 0,
              moderate = 0,
              mild = 0,
              total = data.length;
            let diseaseCounts = {};
            try {
              for (let i = 0; i < data.length; i++) {
                let patient = data[i];
                if (patient.PatientHealthStatus) {
                  if (typeof patient.PatientHealthStatus === 'string') {
                    patient.PatientHealthStatus = JSON.parse(
                      patient.PatientHealthStatus,
                    );
                  }
                  if (patient.PatientHealthStatus.patientCategorizedAs) {
                    switch (patient.PatientHealthStatus.patientCategorizedAs) {
                      case 'mild_illness':
                        mild++;
                        break;
                      case 'moderately_ill':
                        moderate++;
                        break;
                      case 'severely_ill':
                        severe++;
                        break;
                      default:
                        break;
                    }
                  }
                  if (patient.PatientHealthStatus.diseaseType) {
                    if (
                      diseaseCounts[patient.PatientHealthStatus.diseaseType]
                    ) {
                      diseaseCounts[patient.PatientHealthStatus.diseaseType] =
                        diseaseCounts[patient.PatientHealthStatus.diseaseType] +
                        1;
                    } else {
                      diseaseCounts[
                        patient.PatientHealthStatus.diseaseType
                      ] = 1;
                    }
                  }
                }
              }
              let keys = Object.keys(diseaseCounts);
              diseaseCounts = keys.map((diseaseName, idx) => {
                return {
                  name: diseaseName,
                  count: diseaseCounts[diseaseName],
                };
              });
              diseaseCounts.sort((disease1, disease2) => {
                return disease2.count - disease1.count;
              });
              let index;
              if (diseaseCounts.length >= 5) {
                index = 4;
              } else {
                index = diseaseCounts.length - 1;
              }
              let diseaseState = {};
              for (let i = 0; i <= index; i++) {
                diseaseState[`disease${i + 1}`] = {
                  name: this.getDiseaseName(diseaseCounts[i].name),
                  count: diseaseCounts[i].count,
                };
              }
              this.setState({
                isLoading: false,
                severeCount: severe,
                moderateCount: moderate,
                mildCount: mild,
                totalCount: total,
                ...diseaseState,
              });
            } catch (err) {
              this.setState({isLoading: false});
              console.log(err);
            }
          } else {
            console.error(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const {isSignedIn} = this.props;
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      <ScrollView>
        {(() => {
          if (!isSignedIn) {
            return (
              <View>
                <Button
                  mode="contained"
                  style={styles.buttonView}
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}>
                  Login to Update
                </Button>
              </View>
            );
          }
        })()}
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>Dashboard</Text>
        </View>
        <View style={[styles.regionView, styles.rowFlex]}>
          <Text style={[styles.flexOne, styles.regionText]}>
            Health info. of
          </Text>
          <TextInput
            style={styles.flexOne}
            value={this.state.areaName}
            disabled
          />
        </View>
        <View style={styles.regionView}>
          <Text style={styles.heading}>Illness Status</Text>
          <View style={(styles.flexOne, styles.rowFlex)}>
            <View style={styles.flexOne}>
              <View style={[styles.statsView, {backgroundColor: '#B80F0A'}]}>
                <Text style={styles.statsText}>{this.state.severeCount}</Text>
              </View>
              <View style={styles.statsView}>
                <Text>Severe</Text>
              </View>
            </View>
            <View style={styles.flexOne}>
              <View style={[styles.statsView, {backgroundColor: '#FCD12A'}]}>
                <Text style={styles.statsText}>{this.state.moderateCount}</Text>
              </View>
              <View style={styles.statsView}>
                <Text>Moderate</Text>
              </View>
            </View>
            <View style={styles.flexOne}>
              <View style={[styles.statsView, {backgroundColor: '#0080FF'}]}>
                <Text style={styles.statsText}>{this.state.mildCount}</Text>
              </View>
              <View style={styles.statsView}>
                <Text>Mild</Text>
              </View>
            </View>
            <View style={styles.flexOne}>
              <View
                style={[
                  styles.statsView,
                  {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,
                    borderColor: '#000000',
                  },
                ]}>
                <Text style={styles.statsText}>{this.state.totalCount}</Text>
              </View>
              <View style={styles.statsView}>
                <Text>Total</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.regionView}>
          <Text style={styles.heading}>Major Health Issues</Text>
          <View style={[styles.flexOne, styles.rowFlex, {marginBottom: 10}]}>
            <View style={(styles.flexOne, styles.diseaseView)}>
              <View>
                <Text style={styles.statsText}>{this.state.disease1.name}</Text>
              </View>
              <View style={{backgroundColor: '#E5E5E5'}}>
                <Text style={styles.diseaseCount}>
                  {this.state.disease1.count}
                </Text>
              </View>
            </View>
            <View style={(styles.flexOne, styles.diseaseView)}>
              <View>
                <Text style={styles.statsText}>{this.state.disease2.name}</Text>
              </View>
              <View style={{backgroundColor: '#E5E5E5'}}>
                <Text style={styles.diseaseCount}>
                  {this.state.disease2.count}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.flexOne, styles.rowFlex, {marginBottom: 10}]}>
            <View style={(styles.flexOne, styles.diseaseView)}>
              <View>
                <Text style={styles.statsText}>{this.state.disease3.name}</Text>
              </View>
              <View style={{backgroundColor: '#E5E5E5'}}>
                <Text style={styles.diseaseCount}>
                  {this.state.disease3.count}
                </Text>
              </View>
            </View>
            <View style={(styles.flexOne, styles.diseaseView)}>
              <View>
                <Text style={styles.statsText}>{this.state.disease4.name}</Text>
              </View>
              <View style={{backgroundColor: '#E5E5E5'}}>
                <Text style={styles.diseaseCount}>
                  {this.state.disease4.count}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.flexOne, styles.rowFlex, {marginBottom: 10}]}>
            <View style={(styles.flexOne, styles.diseaseView)}>
              <View>
                <Text style={styles.statsText}>{this.state.disease5.name}</Text>
              </View>
              <View style={{backgroundColor: '#E5E5E5'}}>
                <Text style={styles.diseaseCount}>
                  {this.state.disease5.count}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  regionView: {
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  regionText: {
    ...MontserratFont.bold,
    fontSize: 18,
    textAlignVertical: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
  },
  heading: {
    ...MontserratFont.bold,
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 15,
  },
  statsView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  statsText: {
    ...MontserratFont.bold,
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
  },
  diseaseView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: '#888888',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 2,
  },
  diseaseCount: {
    ...MontserratFont.semiBold,
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonView: {
    marginHorizontal: 20,
    padding: 10,
  },
  welcomeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#14213D',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 2,
    marginBottom: 5,
  },
  welcomeText: {
    ...MontserratFont.bold,
    fontSize: 40,
    letterSpacing: 1,
    color: 'white',
  },
});

export default HomeStackScreen;
