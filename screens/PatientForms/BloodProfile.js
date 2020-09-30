import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import PatientContext from '../../components/PatientContext';

class BloodProfile extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ScrollView>
        <Text style={styles.text}>Blood Profile</Text>
        {/* <Text style={styles.subtext}>Basic Blood Profile</Text> */}
        <TextInput
          mode="outlined"
          value={this.context.getValue('wbc')}
          label="Total WBC Count(K/microL)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({wbc: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('haemoglobin')}
          label="Haemoglobin (g/dL)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({haemoglobin: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('pcv')}
          label="Packed Cell Volume (%)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({pcv: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('rbc')}
          label="Total RBC Count (mill/mm3)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({rbc: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('mcv')}
          label="MCV (fL)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({mcv: value});
          }}
          style={styles.textinput}
        />

        <TextInput
          mode="outlined"
          value={this.context.getValue('mch')}
          label="MCH (g)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({mch: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('mchc')}
          label="MCHC (g/dL)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({mchc: value});
          }}
          style={styles.textinput}
        />

        <TextInput
          mode="outlined"
          value={this.context.getValue('mchc')}
          label="MCHC (g/dL)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({mchc: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('rdw')}
          label="Red Cell Distotion Width (%)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({rdw: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('platelet')}
          label="Platelet Count (K/microL)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({platelet: value});
          }}
          style={styles.textinput}
        />

        <Text style={styles.subtext}>Differential Count</Text>
        <TextInput
          mode="outlined"
          value={this.context.getValue('monocytes')}
          label="Monocytes"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({monocytes: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('lymphocytes')}
          label="lymphocytes"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({lymphocytes: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          value={this.context.getValue('eosinophils')}
          label="Eosinophils"
          mode="outlined"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({eosinophils: value});
          }}
          style={styles.textinput}
        />

        <View style={styles.buttonView}>
          <View style={styles.contentScreen}>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={() => this.props.navigation.goBack()}>
              Previous
            </Button>
          </View>

          <View style={styles.contentScreen}>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={() => this.props.navigation.navigate('TestDetailsForm')}>
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
BloodProfile.contextType = PatientContext;

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 20,
    marginLeft: 10,
  },
  subtext: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
  },
  textinput: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
  },
  buttons: {
    margin: 5,
  },
});

export default BloodProfile;
