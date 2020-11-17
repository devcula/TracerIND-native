import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import PatientContext from '../../components/PatientContext';

class PatientHealthStatus extends React.Component {
  constructor() {
    super();
  }

  handleDiseaseType = (value) => {
    if (value === '') {
      this.context.saveDataToParent({
        diseaseTypeSelected: 'NO',
        diseaseType: '',
      });
    } else if (value === 'other') {
      this.context.saveDataToParent({
        diseaseTypeSelected: 'OTHER',
        diseaseType: '',
      });
    } else {
      this.context.saveDataToParent({
        diseaseType: value,
        diseaseTypeSelected: 'YES',
      });
    }
  };

  render() {
    console.log('Rendering PatientHealthStatusForm');
    const diseaseList = [
      {
        label: 'Anaemia',
        value: 'anaemia',
      },
      {
        label: 'Cancer',
        value: 'cancer',
      },
      {
        label: 'Diabetes',
        value: 'diabetes',
      },
      {
        label: 'Heart Related',
        value: 'heart_related',
      },
      {
        label: 'Kidney Related',
        value: 'kidney_related',
      },
      {
        label: 'Lung Related',
        value: 'lung_related',
      },
      {
        label: 'Liver Related',
        value: 'liver_related',
      },
      {
        label: 'Pedal Edema',
        value: 'pedal_enema',
      },
      {
        label: 'Paralysis',
        value: 'paralysis',
      },
      {
        label: 'Thalessemia',
        value: 'thalessemia',
      },
      {
        label: 'Other',
        value: 'other',
      },
    ];
    return (
      <ScrollView>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Patient Health Status</Text>
        </View>
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>
              Disease/Disorder type{' '}
              <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={
                this.context.getValue('diseaseTypeSelected') === 'OTHER'
                  ? 'other'
                  : this.context.getValue('diseaseType')
              }
              onValueChange={(itemValue, itemIndex) => {
                this.handleDiseaseType(itemValue);
              }}>
              <Picker.Item label="Select" value="" />
              {diseaseList.map((disease, i) => {
                return (
                  <Picker.Item
                    label={disease.label}
                    value={disease.value}
                    key={i}
                  />
                );
              })}
            </Picker>
          </View>
          {(() => {
            if (this.context.getValue('diseaseTypeSelected') === 'OTHER') {
              return (
                <TextInput
                  mode="outlined"
                  value={this.context.getValue('diseaseType')}
                  label="Enter Disease/Disorder type"
                  onChangeText={(value) => {
                    this.context.saveDataToParent({diseaseType: value});
                  }}
                  style={styles.textinput}
                />
              );
            }
          })()}
        </View>
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>
              Specify disease condition{' '}
              <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View>
            <TextInput
              mode="outlined"
              value={this.context.getValue('diseaseCondition')}
              multiline
              numberOfLines={4}
              onChangeText={(value) => {
                this.context.saveDataToParent({diseaseCondition: value});
              }}
              style={styles.textinput}
            />
          </View>
        </View>
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Onset of Disease/Disorder :</Text>
          </View>
          <View style={[styles.buttonView]}>
            <View style={{flex: 1}}>
              <TextInput
                mode="outlined"
                value={this.context.getValue('onsetYears')}
                label="Years"
                keyboardType="numeric"
                onChangeText={(value) => {
                  this.context.saveDataToParent({onsetYears: value});
                }}
                style={styles.textinput}
              />
            </View>
            <View style={{flex: 1}}>
              <TextInput
                mode="outlined"
                value={this.context.getValue('onsetMonths')}
                label="Months"
                keyboardType="numeric"
                onChangeText={(value) => {
                  this.context.saveDataToParent({onsetMonths: value});
                }}
                style={styles.textinput}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

PatientHealthStatus.contextType = PatientContext;

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
  },
  buttons: {
    margin: 5,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  textinput: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  pickerView: {
    borderColor: '#888888',
    borderWidth: 1,
    borderRadius: 4,
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
    fontWeight: 'bold',
    fontSize: 30,
  },
  inputLabelView: {
    marginLeft: 5,
    marginTop: 10,
  },
  mandatoryAsterisk: {
    fontWeight: 'bold',
    color: '#FF0000',
  },
});

export default PatientHealthStatus;
