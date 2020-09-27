import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

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
  return (
    <React.Fragment>
      <View style={styles.contentScreen}>
        <Text style={styles.text}>Login</Text>
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
