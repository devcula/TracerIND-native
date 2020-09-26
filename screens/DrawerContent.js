import React from 'react';

import {View, StyleSheet} from 'react-native';

import {Drawer} from 'react-native-paper';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DrawerContent(props) {
  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-plus-outline" color={color} size={size} />
              )}
              label="Add Patient"
              onPress={() => {
                props.navigation.navigate('AddPatient');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="sync" color={color} size={size} />
              )}
              label="Patient List"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="format-list-bulleted" color={color} size={size} />
              )}
              label="Patient Directory"
              onPress={() => {}}
            />
            <DrawerItem
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
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
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
