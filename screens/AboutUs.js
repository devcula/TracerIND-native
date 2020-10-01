import React from 'react';

import {ScrollView, Text, StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-elements';

import {createStackNavigator} from '@react-navigation/stack';

const AboutUsStack = createStackNavigator();

function AboutUsStackScreen({navigation, navHeaderStyles}) {
  console.log('Rendering AboutUsStackScreen');
  return (
    <AboutUsStack.Navigator screenOptions={navHeaderStyles}>
      <AboutUsStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About Us',
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

function AboutUs(props) {
  console.log('Rendering AboutUs');
  return (
    <ScrollView>
      <Text style={styles.title}>Meet Our Team..!!</Text>
      <Card>
        <View style={styles.cardView}>
          <Image
            source={require('../assets/images/S2.png')}
            style={styles.img}
          />
          <Text style={styles.team}>Abhishek Prasad</Text>
          <Text style={styles.profile}>Team Lead</Text>
        </View>
      </Card>
      <Card>
        <View style={styles.cardView}>
          <Image
            source={require('../assets/images/S3.png')}
            style={styles.img}
          />
          <Text style={styles.team}>Shlok Parida</Text>
          <Text style={styles.profile}>Team Lead</Text>
        </View>
      </Card>
      <Card>
        <View style={styles.cardView}>
          <Image
            source={require('../assets/images/S1.png')}
            style={styles.img}
          />
          <Text style={styles.team}>Prakruti Chandak</Text>
          <Text style={styles.profile}>Team Lead</Text>
        </View>
      </Card>
      <Card>
        <View style={styles.cardView}>
          <Image
            source={require('../assets/images/S4.png')}
            style={styles.img}
          />
          <Text style={styles.team}>Hrituja Khatavkar</Text>
          <Text style={styles.profile}>Frontend Developer</Text>
        </View>
      </Card>
      <Card>
        <View style={styles.cardView}>
          <Image
            source={require('../assets/images/S6.png')}
            style={styles.img}
          />
          <Text style={styles.team}>Gaurav Roy</Text>
          <Text style={styles.profile}>Frontend Developer</Text>
        </View>
      </Card>
      {/* <Image source={require('../assets/images/S5.png')} style={styles.img} />
      <Text style={styles.team}>Akshat</Text>
      <Text style={styles.profile}>Android Developer</Text> */}
      {/* <Image source={require('../assets/images/S7.png')} style={styles.img} />
      <Text style={styles.team}>Shubhankar</Text>
      <Text style={styles.profile}>Android Developer</Text>
      <Image source={require('../assets/images/S8.jpeg')} style={styles.img} />
      <Text style={styles.team}>Palak Rai</Text>
      <Text style={styles.profile}>Frontend Developer</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#14213D',
    borderRadius: 10,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 42,
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  img: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 20,
    width: '100%',
    height: 320,
  },
  team: {
    fontSize: 30,
    textAlign: 'center',
    color: '#FCA311',
    fontWeight: 'bold',
  },
  profile: {
    fontSize: 20,
    textAlign: 'center',
    color: '#E5E5E5',
    fontStyle: 'italic',
  },
});

export default AboutUsStackScreen;
