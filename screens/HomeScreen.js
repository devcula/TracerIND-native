import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {Card} from 'react-native-elements';
import {CountUp} from 'use-count-up';
// import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';
import {MontserratFont} from '../components/Constants';

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation, navHeaderStyles}) {
  console.log('Rendering HomeStackScreen');
  return (
    <HomeStack.Navigator screenOptions={navHeaderStyles}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
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
    console.log('Rendering HomeScreen');
    return (
      <ScrollView>
        {/* <Image source={require('../assets/images/5.png')} style={styles.logo} /> */}
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>Welcome!</Text>
        </View>
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
  welcomeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#E5E5E5',
  },
  welcomeText: {
    ...MontserratFont.bold,
    fontSize: 40,
    letterSpacing: 2,
  },
  logo: {
    width: '100%',
    height: 200,
  },
  heading: {
    ...MontserratFont.bold,
    textAlign: 'center',
    fontSize: 22,
    marginTop: 20,
  },
  activeCardBody: {
    margin: 15,
    fontSize: 20,
    ...MontserratFont.bold,
    textAlign: 'center',
    color: '#176CF8',
  },
  confirmedCardBody: {
    margin: 15,
    fontSize: 20,
    ...MontserratFont.bold,
    textAlign: 'center',
    color: '#D13C2B',
  },
  recoveredCardBody: {
    margin: 15,
    fontSize: 20,
    ...MontserratFont.bold,
    textAlign: 'center',
    color: '#4DC939',
  },
  deathCardBody: {
    margin: 15,
    fontSize: 20,
    ...MontserratFont.bold,
    textAlign: 'center',
    color: '#F57E1C',
  },
  titleActive: {
    fontSize: 25,
    ...MontserratFont.bold,
    textAlign: 'center',
    color: '#176CF8',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  titleConfirmed: {
    fontSize: 25,
    ...MontserratFont.bold,
    textAlign: 'center',
    color: '#D13C2B',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  titleRecovered: {
    fontSize: 25,
    ...MontserratFont.bold,
    textAlign: 'center',
    color: '#4DC939',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  titleDeath: {
    fontSize: 25,
    ...MontserratFont.bold,
    textAlign: 'center',
    color: '#F57E1C',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
});

export default HomeStackScreen;
