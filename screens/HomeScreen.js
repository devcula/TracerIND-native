import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {CountUp} from 'use-count-up';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation, navHeaderStyles}) {
  return (
    <HomeStack.Navigator screenOptions={navHeaderStyles}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Welcome to TracerIND',
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
    </HomeStack.Navigator>
  );
}

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
  }

  componentDidMount = () => {
    fetch('https://api.covidindiatracker.com/state_data.json', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        if (responseJson) {
          for (let i = 0; i < responseJson.length; i++) {
            if (responseJson[i].id === 'IN-AP') {
              //return data[i];
              // console.log(responseJson[i]);
              this.setState({
                data: responseJson[i],
              });
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <ScrollView>
        <Image source={require('../assets/images/5.png')} style={styles.logo} />
        <Text style={styles.heading}>Covid stats of Andhra Pradesh</Text>
        <Card>
          <Text style={styles.titleActive}>Active</Text>
          <Text style={styles.activeCardBody}>
            <Text>
              <CountUp isCounting end={this.state.data.active} duration={2} />
            </Text>
          </Text>
        </Card>
        <Card>
          <Text style={styles.titleConfirmed}> Confirmed</Text>
          <Text style={styles.confirmedCardBody}>
            <Text>
              <CountUp
                isCounting
                end={this.state.data.confirmed}
                duration={2}
              />
            </Text>
          </Text>
        </Card>
        <Card>
          <Text style={styles.titleRecovered}>Recovered</Text>
          <Text style={styles.recoveredCardBody}>
            <Text>
              <CountUp
                isCounting
                end={this.state.data.recovered}
                duration={2}
              />
            </Text>
          </Text>
        </Card>
        <Card>
          <Text style={styles.titleDeath}>Deaths</Text>
          <Text style={styles.deathCardBody}>
            <Text>
              <CountUp isCounting end={this.state.data.deaths} duration={2} />
            </Text>
          </Text>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    borderRadius: 20,
  },
  logo: {
    width: '100%',
    height: 200,
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 23,
    marginTop: 20,
  },
  activeCardBody: {
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#176CF8',
  },
  confirmedCardBody: {
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D13C2B',
  },
  recoveredCardBody: {
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4DC939',
  },
  deathCardBody: {
    margin: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F57E1C',
  },
  titleActive: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#176CF8',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  titleConfirmed: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D13C2B',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  titleRecovered: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4DC939',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  titleDeath: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F57E1C',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
});

export default HomeStackScreen;
