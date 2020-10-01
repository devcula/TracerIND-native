import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button,TextInput} from 'react-native-paper';
import PatientContext from '../../components/PatientContext';
import CheckBox from '@react-native-community/checkbox';


class Observations extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>Observations</Text>
        </View>
        <View>
<Text style={styles.subtext}>Basic Vitals</Text>
</View>
<View>
<TextInput
mode="outlined"
value={this.context.getValue('weight')}
label="Weight (kg)"
onChangeText={(value) => {
  this.context.saveDataToParent({weight: value});
}}
style={styles.textinput}
/>
</View>
<View>
<TextInput
mode="outlined"
value={this.context.getValue('height')}
label="Height (cm)"
onChangeText={(value) => {
  this.context.saveDataToParent({height: value});
}}
style={styles.textinput}
/>
</View>
<View>
<TextInput
mode="outlined"
value={this.context.getValue('temperature')}
label="Temperature (° Farhenheit) "
onChangeText={(value) => {
  this.context.saveDataToParent({temperature: value});
}}
style={styles.textinput}
/>
</View>
<View>
<TextInput
mode="outlined"
value={this.context.getValue('bloodpressure')}
label="Blood Pressure(mm of Hg) "
onChangeText={(value) => {
  this.context.saveDataToParent({bloodpressure: value});
}}
style={styles.textinput}
/>
</View>
<View>
<TextInput
mode="outlined"
value={this.context.getValue('heartrate')}
label="Heart Rate (bpm)"
onChangeText={(value) => {
  this.context.saveDataToParent({heartrate: value});
}}
style={styles.textinput}
/>
</View>
<View>
<TextInput
mode="outlined"
value={this.context.getValue('pulserate')}
label="Pulse Rate (bpm) "
onChangeText={(value) => {
  this.context.saveDataToParent({pulserate: value});
}}
style={styles.textinput}
/>
</View>
<View>
<TextInput
mode="outlined"
value={this.context.getValue('respiratoryrate')}
label="Respiratory Rate (bpm) "
onChangeText={(value) => {
  this.context.saveDataToParent({respiratoryrate: value});
}}
style={styles.textinput}
/>
</View>

        <View>
          <Text style={styles.subtext}>Basic Symptoms</Text>
        </View>
        <View style={styles.checkboxContainer}>
        <CheckBox
    value={this.context.getValue('fever')}
    onValueChange={(value) => {
      this.context.saveDataToParent({fever : value});
    }}/>
     <Text style={styles.checkboxText}>Fever</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
    value={this.context.getValue('aches')}
    onValueChange={(value) => {
      this.context.saveDataToParent({aches : value});
    }}/>
     <Text style={styles.checkboxText}>Aches and Pains</Text>
      </View>
      
      <View style={styles.checkboxContainer}>
        <CheckBox
    value={this.context.getValue('cold')}
    onValueChange={(value) => {
      this.context.saveDataToParent({cold : value});
    }}/>
     <Text style={styles.checkboxText}>Cold</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
    value={this.context.getValue('cough')}
    onValueChange={(value) => {
      this.context.saveDataToParent({cough : value});
    }}/>
     <Text style={styles.checkboxText}>Cough</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
    value={this.context.getValue('fatigue')}
    onValueChange={(value) => {
      this.context.saveDataToParent({fatigue : value});
    }}/>
     <Text style={styles.checkboxText}>Fatigue</Text>
      </View>
            
      <View style={styles.checkboxContainer}>
        <CheckBox
    value={this.context.getValue('diarrohea')}
    onValueChange={(value) => {
      this.context.saveDataToParent({diarrohea : value});
    }}/>
     <Text style={styles.checkboxText}>Diarrohea</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
    value={this.context.getValue('infection')}
    onValueChange={(value) => {
      this.context.saveDataToParent({infection : value});
    }}/>
     <Text style={styles.checkboxText}>Infection</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
    value={this.context.getValue('bleeding')}
    onValueChange={(value) => {
      this.context.saveDataToParent({bleeding : value});
    }}/>
     <Text style={styles.checkboxText}>Bleeding</Text>
      </View>
      <View >
      <TextInput
      style={ styles.textinput}
      value={this.context.getValue('otherSymptoms')}
      label="Other Symptoms"
      onChangeText={(value) => {
        this.context.saveDataToParent({otherSymptoms: value});
      }}
    />
    
      </View>

    
    
      
      

        <Button mode="contained" onPress={() => this.props.navigation.goBack()}>
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={() => this.props.navigation.navigate('BloodProfileForm')}>
          Next
        </Button>
      </ScrollView>
    );
  }
}

Observations.contextType = PatientContext;

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop:20,
    marginLeft:10,
  },
  subtext:{
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom:10,
    marginTop:20,
    marginLeft:10,

  },
  textinput:{
    marginBottom:5,
    marginTop:5,
    marginLeft:10,
    marginRight:10,

  },  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkboxText:{
    fontSize:20,
  }
});

export default Observations;
