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

const Drawer = createDrawerNavigator();

export const AuthContext = React.createContext();

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
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
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
          let userDetails = JSON.stringify({
            token: 'dummy-auth-token',
            timestamp: new Date(),
          });
          await AsyncStorage.setItem('userToken', userDetails);
          dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
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
    </React.Fragment>
  );
}
