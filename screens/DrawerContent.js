import React from 'react';

import {View, StyleSheet} from 'react-native';

import {Drawer} from 'react-native-paper';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthContext from '../components/AuthContext';
import {MontserratFont} from '../components/Constants';

export default function DrawerContent(props) {
  console.log('Rendering DrawerContent');
  const {signOut} = React.useContext(AuthContext);
  const {isSignedIn} = props;
  const labelStyle = {
    ...MontserratFont.bold,
    fontSize: 14,
  };
  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              labelStyle={labelStyle}
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Dashboard"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              labelStyle={labelStyle}
              icon={({color, size}) => (
                <Icon name="account-plus-outline" color={color} size={size} />
              )}
              label="Add Patient"
              onPress={() => {
                props.navigation.navigate('AddPatient', {
                  screen: 'BasicDetailsForm',
                });
              }}
            />
            <DrawerItem
              labelStyle={labelStyle}
              icon={({color, size}) => (
                <Icon name="sync" color={color} size={size} />
              )}
              label="Patient List"
              onPress={() => {
                props.navigation.navigate('LocalPatientList');
              }}
            />
            <DrawerItem
              labelStyle={labelStyle}
              icon={({color, size}) => (
                <Icon name="format-list-bulleted" color={color} size={size} />
              )}
              label="Patient Directory"
              onPress={() => {
                if (isSignedIn) {
                  props.navigation.navigate('Directory');
                } else {
                  props.navigation.navigate('Login');
                }
              }}
            />
            <DrawerItem
              labelStyle={labelStyle}
              icon={({color, size}) => (
                <Icon name="information-outline" color={color} size={size} />
              )}
              label="About Us"
              onPress={() => {
                props.navigation.navigate('AboutUs');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {(() => {
          if (isSignedIn) {
            return (
              <DrawerItem
                labelStyle={labelStyle}
                icon={({color, size}) => (
                  <Icon name="exit-to-app" color={color} size={size} />
                )}
                label="Sign Out"
                onPress={() => signOut()}
              />
            );
          } else {
            return (
              <DrawerItem
                labelStyle={labelStyle}
                icon={({color, size}) => (
                  <Icon name="login" color={color} size={size} />
                )}
                label="Sign In"
                onPress={() => {
                  props.navigation.navigate('Login');
                }}
              />
            );
          }
        })()}
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  logo: {
    width: 50,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
