import React, {Component} from 'react';

import {View, ScrollView, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import AuthContext from '../components/AuthContext';
import axios from 'axios';
import URI from '../components/URI';
import SplashScreen from './SplashScreen';

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
    if (this.state.searchQuery.length === 0) {
      return this.state.patientDetails.map((element, i) => {
        return (
          <View style={{margin: 10}} key={i}>
            <Text>{element.name}</Text>
            <Text>{element.phone}</Text>
          </View>
        );
      });
    } else {
      return this.state.patientDetails
        .filter((person) =>
          person.name
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase()),
        )
        .map((item, i) => {
          return (
            <View style={{margin: 10}} key={i}>
              <Text>{item.name}</Text>
              <Text>{item.phone}</Text>
            </View>
          );
        });
    }
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

        <ScrollView>{this.patientList()}</ScrollView>
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
});

PatientDirectory.contextType = AuthContext;
export default DirectoryStackScreen;
