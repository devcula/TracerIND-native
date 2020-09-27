import React from 'react';

import {View, TextInput, StyleSheet, Button} from 'react-native';
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
  return (
    <React.Fragment>
      {/* <View style={styles.contentScreen}>
        <Text style={styles.text}>Login</Text>
      </View> */}
      <View style={styles.contentScreen}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={() => signIn({username, password})} />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default LoginStackScreen;
