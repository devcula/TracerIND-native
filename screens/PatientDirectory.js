import React, {Component} from 'react';

import {View, ScrollView, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import AuthContext from '../components/AuthContext';
import axios from 'axios';
import URI from '../components/URI';
import SplashScreen from './SplashScreen';

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
    };
  }

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
        <View style={styles.cardView} key={i}>
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
      );
    });
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // contentScreen: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
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
});

PatientDirectory.contextType = AuthContext;
export default DirectoryStackScreen;
