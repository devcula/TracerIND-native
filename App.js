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
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
// import {StatusBar} from 'react-native';

// import GlobalFont from 'react-native-global-font';

import SplashScreen from './screens/SplashScreen';
import DrawerContent from './screens/DrawerContent';
import HomeStackScreen from './screens/HomeScreen';
import AboutUsStackScreen from './screens/AboutUs';
import AddPatientStackScreen from './screens/AddPatient';
import LoginStackScreen from './screens/LoginScreen';
import DirectoryStackScreen from './screens/PatientDirectory';
import LocalPatientListStackScreen from './screens/LocalPatientList';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const Drawer = createDrawerNavigator();

export const AuthContext = React.createContext();

export const URI =
  process.env.NODE_ENV === 'production'
    ? 'https://api-tracerind.covidindiataskforce.org/api/'
    : 'https://api-tracerind.covidindiataskforce.org/api/';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Montserrat-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Montserrat-Thin',
      fontWeight: 'normal',
    },
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

const paperTheme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
    },
  );

  const refreshToken = (previousToken) => {
    axios
      .post(URI + 'token_jwt_refresh/', {token: previousToken})
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then((data) => {
        if (data) {
          let newUserData = {
            ...state,
            token: data.token,
            timestamp: new Date(),
          };
          AsyncStorage.setItem('userToken', newUserData).then(() => {
            dispatch({type: 'SIGN_IN', token: newUserData});
          });
        }
      })
      .catch((error) => {
        AsyncStorage.removeItem('userToken').then(() =>
          dispatch({type: 'SIGN_OUT'}),
        );
      });
  };

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place

    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log(userToken);
        userToken = JSON.parse(userToken);
        let msecDifference =
          new Date().getTime() - new Date(userToken.timestamp).getTime();
        if (msecDifference / (1000 * 60 * 60) >= 3.9) {
          await AsyncStorage.removeItem('userToken');
          dispatch({type: 'SIGN_OUT'});
        } else {
          dispatch({type: 'RESTORE_TOKEN', token: userToken});
          refreshToken(userToken.token);
        }
      } catch (e) {
        // Restoring token failed
        await AsyncStorage.removeItem('userToken');
        dispatch({type: 'SIGN_OUT'});
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        try {
          let userDetails = JSON.stringify(data);
          await AsyncStorage.setItem('userToken', userDetails);
          dispatch({type: 'SIGN_IN', token: data});
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          dispatch({type: 'SIGN_OUT'});
        } catch (error) {
          //Error handling
        }
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <React.Fragment>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Drawer.Navigator
              overlayColor="#14213D"
              drawerContent={(props) => (
                <DrawerContent
                  {...props}
                  isSignedIn={state.userToken ? true : false}
                />
              )}>
              <Drawer.Screen name="Home">
                {(props) => (
                  <HomeStackScreen
                    {...props}
                    navHeaderStyles={navHeaderStyles}
                  />
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
                if (!state.userToken) {
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
          </AuthContext.Provider>
        </NavigationContainer>
      </PaperProvider>
    </React.Fragment>
  );
}
