/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StatusBar} from 'react-native';

import GlobalFont from 'react-native-global-font';

import HomeStackScreen from './screens/HomeScreen';
import AboutUsStackScreen from './screens/AboutUs';
import AddPatientStackScreen from './screens/AddPatient';
import DrawerContent from './screens/DrawerContent';
import SplashScreen from './screens/SplashScreen';

const Drawer = createDrawerNavigator();

const navHeaderStyles = {
  headerStyle: {
    backgroundColor: '#14213D',
  },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSignedIn: false,
    };
  }

  componentDidMount() {
    let fontName = 'Montserrat-Regular';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    let {isSignedIn, isLoading} = this.state;
    if (isLoading) {
      return <SplashScreen />;
    }
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Drawer.Navigator
            overlayColor="#14213D"
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home">
              {(props) => (
                <HomeStackScreen {...props} navHeaderStyles={navHeaderStyles} />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="AddPatient">
              {(props) => (
                <AddPatientStackScreen
                  {...props}
                  navHeaderStyles={navHeaderStyles}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="AboutUs">
              {(props) => (
                <AboutUsStackScreen
                  {...props}
                  navHeaderStyles={navHeaderStyles}
                />
              )}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      </React.Fragment>
    );
  }
}

export default App;
