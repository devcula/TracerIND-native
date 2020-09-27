import React from 'react';

import {ScrollView, Text, StyleSheet,Image,View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createStackNavigator} from '@react-navigation/stack';

const AboutUsStack = createStackNavigator();

function AboutUsStackScreen({navigation, navHeaderStyles}) {
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

function AboutUs(props) {
  return (

<ScrollView>
<Text style={styles.title}>Meet Our Team..!!</Text>
<Image source={require('../assets/images/S1.png')} style={styles.img} />
  <Text style={styles.team}>
 Prakruti Chandak
  </Text>
  <Text style={styles.profile}>
 Team Lead
  </Text>
  <Image source={require('../assets/images/S3.png')} style={styles.img} />
  <Text style={styles.team}>
  Shlok Parida
  </Text>
  <Text style={styles.profile}>
 Team Lead
  </Text>
  <Image source={require('../assets/images/S2.png')} style={styles.img} />
  <Text style={styles.team}>
  Abhishek
  </Text>
  <Text style={styles.profile}>
 Team Lead
  </Text>
  <Image source={require('../assets/images/S4.png')} style={styles.img} />
  <Text style={styles.team}>
  Hrituja Khatavkar
  </Text>
  <Text style={styles.profile}>
 Frontend Developer
  </Text>
  <Image source={require('../assets/images/S5.png')} style={styles.img} />
  <Text style={styles.team}>
 Akshat 
  </Text>
  <Text style={styles.profile}>
 Android Developer
  </Text>
  <Image source={require('../assets/images/S6.png')} style={styles.img} />
  <Text style={styles.team}>
 Gaurav Roy
  </Text>
  <Text style={styles.profile}>
 Frontend Developer
  </Text>
  <Image source={require('../assets/images/S7.png')} style={styles.img} />
  <Text style={styles.team}>
  Shubhankar
  </Text>
  <Text style={styles.profile}>
 Android Developer
  </Text>
  <Image source={require('../assets/images/S8.jpeg')} style={styles.img} />
  <Text style={styles.team}>
  Palak Rai
  </Text>
  <Text style={styles.profile}>
 Frontend Developer
  </Text>

</ScrollView>





  );
}

const styles = StyleSheet.create({
  container: {
  flex:1,
    flexDirection:'row',
    justifyContent:'center',
    textAlign: 'center',
    paddingTop: 40,
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: 42,
    marginTop:20,  
    textAlign:'center', 
    fontStyle:'italic',
  },
  img:{
    borderRadius:250,
    marginTop:20,
    marginBottom:20,
    width:410,
    height:410,
  
    
  },
  team: {
    
    fontSize: 30,
    textAlign:"center",
     },
     profile:{
       fontSize: 25,
       textAlign:"center",
   
     },
});

export default AboutUsStackScreen;
