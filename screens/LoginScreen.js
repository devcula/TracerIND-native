import React from 'react';

import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Avatar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../App';

const LoginStack = createStackNavigator();

function LoginStackScreen({navigation, navHeaderStyles}) {
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

  const {signIn} = React.useContext(AuthContext);

  function handleSignIn(username, password) {
    if (username !== '' && password !== '') {
      signIn({username, password});
    } else {
      alert('Both values are needed');
    }
  }
  return (
    <ScrollView>
      {/* <View style={styles.contentScreen}>
        <Text style={styles.text}>Login</Text>
      </View> */}
      <View style={styles.contentScreen}>
        <View style={styles.logoView}>
          <Avatar.Image
            size={200}
            source={require('../assets/images/logo.jpg')}
          />
          <Text style={styles.heading}>Enter your details</Text>
        </View>
        <View style={styles.usernameView}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={(user) => setUsername(user)}
          />
        </View>
        <View style={styles.passView}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={(pass) => setPassword(pass)}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            mode="contained"
            icon="login"
            onPress={() => handleSignIn(username, password)}>
            Sign in
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
  usernameView: {},
  passView: {
    marginTop: 10,
  },
  buttonView: {
    marginTop: 10,
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
    fontWeight: 'bold',
  },
});

export default LoginStackScreen;
