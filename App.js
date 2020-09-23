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
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StatusBar, StyleSheet} from 'react-native';

import GlobalFont from 'react-native-global-font';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import AboutUs from './screens/AboutUs';

const HomeStack = createStackNavigator();
const AboutUsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

function HomeStackScreen({navigation}) {
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

function AboutUsStackScreen({navigation}) {
  return (
    <AboutUsStack.Navigator screenOptions={navHeaderStyles}>
      <AboutUsStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'Meet our team',
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
    </AboutUsStack.Navigator>
  );
}

class App extends React.Component {
  componentDidMount() {
    let fontName = 'Montserrat-Regular';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <Drawer.Navigator overlayColor="#14213D">
            <Drawer.Screen name="Home">
              {(props) => <HomeStackScreen {...props} styles={styles} />}
            </Drawer.Screen>
            <Drawer.Screen name="AboutUs">
              {(props) => <AboutUsStackScreen {...props} styles={styles} />}
            </Drawer.Screen>
          </Drawer.Navigator>
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
