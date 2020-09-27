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

import SplashScreen from './screens/SplashScreen';
import DrawerContent from './screens/DrawerContent';
import HomeStackScreen from './screens/HomeScreen';
import AboutUsStackScreen from './screens/AboutUs';
import AddPatientStackScreen from './screens/AddPatient';
import LoginStackScreen from './screens/LoginScreen';
import DirectoryStackScreen from './screens/PatientDirectory';
import LocalPatientListStackScreen from './screens/LocalPatientList';

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
      isSignedIn: true,
    };
  }

  componentDidMount() {
    let fontName = 'Montserrat-Regular';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    let {isLoading} = this.state;
    if (isLoading) {
      return <SplashScreen />;
    }
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Drawer.Navigator
            overlayColor="#14213D"
            drawerContent={(props) => (
              <DrawerContent {...props} isSignedIn={this.state.isSignedIn} />
            )}>
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
            <Drawer.Screen name="LocalPatientList">
              {(props) => (
                <LocalPatientListStackScreen
                  {...props}
                  navHeaderStyles={navHeaderStyles}
                />
              )}
            </Drawer.Screen>
            {(() => {
              if (!this.state.isSignedIn) {
                return (
                  <Drawer.Screen name="Login">
                    {(props) => (
                      <LoginStackScreen
                        {...props}
                        navHeaderStyles={navHeaderStyles}
                      />
                    )}
                  </Drawer.Screen>
                );
              } else {
                return (
                  <Drawer.Screen name="Directory">
                    {(props) => (
                      <DirectoryStackScreen
                        {...props}
                        navHeaderStyles={navHeaderStyles}
                      />
                    )}
                  </Drawer.Screen>
                );
              }
            })()}
          </Drawer.Navigator>
        </NavigationContainer>
      </React.Fragment>
    );
  }
}

export default App;
