import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import PatientContext from '../../components/PatientContext';
import CheckBox from '@react-native-community/checkbox';
import {MontserratFont} from '../../components/Constants';

class Observations extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('Rendering Observations');
    return (
      <ScrollView>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Observations</Text>
        </View>
        <View style={[styles.contentScreen, styles.subtextView]}>
          <Text style={styles.subtext}>Basic Vitals</Text>
        </View>
        <View>
          {/* <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Weight (Kg)</Text>
          </View> */}
          <TextInput
            mode="outlined"
            value={this.context.getValue('weight')}
            label="Weight (kg)"
            keyboardType="numeric"
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
            keyboardType="numeric"
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
            keyboardType="numeric"
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
            keyboardType="numeric"
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
            keyboardType="numeric"
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
            keyboardType="numeric"
            onChangeText={(value) => {
              this.context.saveDataToParent({respiratoryrate: value});
            }}
            style={styles.textinput}
          />
        </View>

        <View style={[styles.contentScreen, styles.subtextView]}>
          <Text style={styles.subtext}>Basic Symptoms</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.context.getValue('fever')}
            onValueChange={(value) => {
              this.context.saveDataToParent({fever: value});
            }}
          />
          <Text style={styles.checkboxText}>Fever</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.context.getValue('aches')}
            onValueChange={(value) => {
              this.context.saveDataToParent({aches: value});
            }}
          />
          <Text style={styles.checkboxText}>Aches and Pains</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.context.getValue('cold')}
            onValueChange={(value) => {
              this.context.saveDataToParent({cold: value});
            }}
          />
          <Text style={styles.checkboxText}>Cold</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.context.getValue('cough')}
            onValueChange={(value) => {
              this.context.saveDataToParent({cough: value});
            }}
          />
          <Text style={styles.checkboxText}>Cough</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.context.getValue('fatigue')}
            onValueChange={(value) => {
              this.context.saveDataToParent({fatigue: value});
            }}
          />
          <Text style={styles.checkboxText}>Fatigue</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.context.getValue('diarrohea')}
            onValueChange={(value) => {
              this.context.saveDataToParent({diarrohea: value});
            }}
          />
          <Text style={styles.checkboxText}>Diarrohea</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.context.getValue('infection')}
            onValueChange={(value) => {
              this.context.saveDataToParent({infection: value});
            }}
          />
          <Text style={styles.checkboxText}>Infection</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={this.context.getValue('bleeding')}
            onValueChange={(value) => {
              this.context.saveDataToParent({bleeding: value});
            }}
          />
          <Text style={styles.checkboxText}>Bleeding</Text>
        </View>
        <View>
          <TextInput
            multiline
            mode="outlined"
            numberOfLines={4}
            style={styles.textinput}
            value={this.context.getValue('otherSymptoms')}
            label="Other Symptoms"
            onChangeText={(value) => {
              this.context.saveDataToParent({otherSymptoms: value});
            }}
          />
        </View>
        <View style={styles.buttonView}>
          <View style={{flex: 1}}>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={() =>
                this.context.saveDataToParent({formName: 'BasicDetailsForm'})
              }>
              Previous
            </Button>
          </View>

          <View style={{flex: 1}}>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={() =>
                this.context.saveDataToParent({formName: 'BloodProfileForm'})
              }>
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Observations.contextType = PatientContext;

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
    marginLeft: 10,
  },
  subtext: {
    ...MontserratFont.bold,
    fontSize: 20,
    paddingVertical: 10,
    color: '#FCA311',
  },
  subtextView: {
    backgroundColor: '#14213D',
    marginHorizontal: '20%',
    borderRadius: 10,
    marginVertical: 10,
  },
  textinput: {
    marginBottom: 5,
    marginHorizontal: 10,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  checkboxText: {
    fontSize: 16,
    ...MontserratFont.semiBold,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
  },
  buttons: {
    margin: 5,
  },
  headingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderBottomColor: '#888888',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  headingText: {
    ...MontserratFont.bold,
    fontSize: 30,
  },
});

export default Observations;
