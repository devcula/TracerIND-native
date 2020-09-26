import React, { Component } from 'react';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import AnimateNumber from 'react-native-countup'
import { Image } from 'react-native';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }

  componentDidMount = () => {
    fetch('https://api.covidindiatracker.com/state_data.json', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson) {
          for (let i = 0; i < responseJson.length; i++) {
            if (responseJson[i].id === 'IN-AP') {
              //return data[i];
              console.log(responseJson[i])
              this.setState({
                data: responseJson[i]
              })
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView>
        <Image
          source={require('../img/5.png')}
          style={{ width: 430, height: 200 }}
        />
        <Text style={{
          fontWeight: 'bold',
          textAlign: 'center', fontSize: 20
        }}>Covid stats of Andhra Pradesh</Text>
        <Card >
          <Text style={styles.titleActive}>Active</Text>
          <Text style={styles.activeCardBody}>
            <AnimateNumber initial={0} steps={5} value={this.state.data.active} interval={6} />
          </Text>
        </Card>
        <Card>
          <Text style={styles.titleConfirmed} > Confirmed</Text>
          <Text style={styles.confirmedCardBody}>

            <AnimateNumber initial={0} steps={5} value={this.state.data.confirmed} interval={6} />
          </Text>
        </Card><Card>
          <Text style={styles.titleRecovered}>Recovered</Text>
          <Text style={styles.recoveredCardBody}>
            <AnimateNumber initial={0} steps={5} value={this.state.data.recovered} interval={6} />
          </Text>
        </Card>
        <Card >
          <Text style={styles.titleDeath}>Deaths</Text>
          <Text style={styles.deathCardBody}>
            <AnimateNumber initial={0} steps={5} value={this.state.data.deaths} interval={6} />
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
  }
});

export default HomeScreen;

