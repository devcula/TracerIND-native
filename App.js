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
import {StatusBar} from 'react-native';

import GlobalFont from 'react-native-global-font';

import HomeScreen from './components/HomeScreen';

const Stack = createStackNavigator();
global.backgroundColor = '#000000';

const navTheme = {
  dark: true,
  colors: {
    primary: '#14213D',
    background: '#14213D',
    card: '',
    text: '#FFFFFF',
    border: '',
    notification: '',
  },
};

class App extends React.Component {
  componentDidMount() {
    let fontName = 'Montserrat-Medium';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Welcome to TracerIND'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </React.Fragment>
    );
  }
}

export default App;
