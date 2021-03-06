import React from 'react';

import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Avatar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';
import AuthContext from '../components/AuthContext';

import axios from 'axios';
import URI from '../components/URI';
import {MontserratFont} from '../components/Constants';

const LoginStack = createStackNavigator();

function LoginStackScreen({navigation, navHeaderStyles}) {
  console.log('Rendering LoginStackScreen');
  return (
    <LoginStack.Navigator screenOptions={navHeaderStyles}>
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
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
    </LoginStack.Navigator>
  );
}

function LoginScreen(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const {signIn} = React.useContext(AuthContext);

  function handleSignIn() {
    // console.log(URI);
    // console.log('Inside handle sign in');
    setIsSigningIn(true);
    if (username !== '' && password !== '') {
      axios
        .post(URI + 'token_jwt_get/', {username, password}, {timeout: 10000})
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .then((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (user) {
            let userData = {
              username,
              token: user.token,
              timestamp: new Date(),
            };
            signIn(userData);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            alert('Invalid credentials');
          }
          setIsSigningIn(false);
        });
    } else {
      setIsSigningIn(false);
      alert('Both values are needed');
    }
  }
  console.log('Rendering Login');
  return (
    <ScrollView>
      <View style={styles.contentScreen}>
        <View style={styles.logoView}>
          <Avatar.Image
            size={200}
            source={require('../assets/images/logo.jpeg')}
          />
          <Text style={styles.heading}>Enter login details</Text>
        </View>
        <View style={[{flex: 1, flexDirection: 'row'}]}>
          <View style={[styles.inputLabelView, styles.flexOneCenter]}>
            <Text style={styles.inputLabel}>Username</Text>
          </View>
          <View style={{flex: 2}}>
            <TextInput
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={(user) => setUsername(user)}
            />
          </View>
        </View>
        <View style={[{flex: 1, flexDirection: 'row'}]}>
          <View style={[styles.inputLabelView, styles.flexOneCenter]}>
            <Text style={styles.inputLabel}>Password</Text>
          </View>
          <View style={{flex: 2}}>
            <TextInput
              mode="outlined"
              label="Password"
              value={password}
              onChangeText={(pass) => setPassword(pass)}
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonView}>
          <Button
            loading={isSigningIn}
            mode="contained"
            icon="login"
            onPress={() => handleSignIn(username, password)}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  flexOneCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passView: {
    marginTop: 10,
  },
  buttonView: {
    marginTop: 20,
  },
  inputLabelView: {
    marginTop: 5,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  inputLabel: {
    ...MontserratFont.bold,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 15,
    ...MontserratFont.bold,
  },
  buttonText: {
    ...MontserratFont.bold,
    fontSize: 15,
  },
});

export default LoginStackScreen;
