/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, StyleSheet} from 'react-native';

import GlobalFont from 'react-native-global-font';

import HomeScreen from './components/HomeScreen';
import AboutUs from './components/AboutUs';

const Stack = createStackNavigator();

const navTheme = {
  dark: true,
  colors: {
    primary: '#14213D',
    background: '#000000',
    card: '#14213D',
    text: '#FFFFFF',
    border: '#E5E5E5',
    notification: '#000000',
  },
};

class App extends React.Component {
  componentDidMount() {
    let fontName = 'Montserrat-Regular';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{title: 'Welcome to TracerIND'}}>
              {(props) => <HomeScreen {...props} styles={styles} />}
            </Stack.Screen>
            <Stack.Screen name="AboutUs" options={{title: 'Meet our Team'}}>
              {(props) => <AboutUs {...props} styles={styles} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  center: {
    textAlign: 'center',
  },
  cardStyle: {
    margin: 10,
    padding: 10,
    backgroundColor: '#14213D',
  },
  ourFont: {
    fontFamily: 'Montserrat-Medium',
  },
  scrollView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  buttonStyle: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 50,
  },
});

export default App;
