import React from 'react';
import {ScrollView, View, Text, StyleSheet, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import PatientContext from '../../components/PatientContext';
import {MontserratFont} from '../../components/Constants';

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

  handleTreatmentProvided = (value) => {
    if (value === '') {
      this.context.saveDataToParent({
        treatmentProvidedAtSelected: 'NO',
        treatmentProvidedAt: '',
      });
    } else if (value === 'other') {
      this.context.saveDataToParent({
        treatmentProvidedAtSelected: 'OTHER',
        treatmentProvidedAt: '',
      });
    } else {
      this.context.saveDataToParent({
        treatmentProvidedAt: value,
        treatmentProvidedAtSelected: 'YES',
      });
    }
  };

  validateAndSubmit = () => {
    if (!this.context.getValue('diseaseType')) {
      Alert.alert('Missing value', 'Please Select Disease/Disorder type');
      return;
    }
    if (!this.context.getValue('diseaseCondition')) {
      Alert.alert('Missing value', 'Please Enter disease condition');
      return;
    }
    this.context.submitForm(
      () =>
        Alert.alert(
          'SUCCESS!',
          'Patient saved locally. Use Patient sync tab to upload.',
        ),
      () => Alert.alert('FAILED!', 'Please try again'),
    );
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
    const hospitalList = [
      {
        label: 'PHC/Tulasipaka',
        value: 'PHC/Tulasipaka',
      },
      {
        label: 'PHC/E.D Pally',
        value: 'PHC/E.D Pally',
      },
      {
        label: 'PHC/Laxmipuram',
        value: 'PHC/Laxmipuram',
      },
      {
        label: 'PHC/Gowridevipeta',
        value: 'PHC/Gowridevipeta',
      },
      {
        label: 'PHC/Kuturu',
        value: 'PHC/Kuturu',
      },
      {
        label: 'PHC/Rekhapally',
        value: 'PHC/Rekhapally',
      },
      {
        label: 'PHC/Jeediguppa',
        value: 'PHC/Jeediguppa',
      },
      {
        label: 'AH/Chintoor',
        value: 'AH/Chintoor',
      },
      {
        label: 'AH/Rampachodavaram',
        value: 'AH/Rampachodavaram',
      },
      {
        label: 'AH/Bhadrachalam',
        value: 'AH/Bhadrachalam',
      },
      {
        label: 'DH/Rajamundry',
        value: 'DH/Rajamundry',
      },
      {
        label: 'GGH/Kakinada',
        value: 'GGH/Kakinada',
      },
      {
        label: 'Other',
        value: 'other',
      },
    ];
    const patientCategorizedAsList = [
      {
        label: 'Healthy',
        value: 'healthy',
      },
      {
        label: 'With Mild Illness',
        value: 'mild_illness',
      },
      {
        label: 'Moderately ill',
        value: 'moderately_ill',
      },
      {
        label: 'Severely ill',
        value: 'severely_ill',
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
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Treatment Provided at :</Text>
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={
                this.context.getValue('treatmentProvidedAtSelected') === 'OTHER'
                  ? 'other'
                  : this.context.getValue('treatmentProvidedAt')
              }
              onValueChange={(itemValue, itemIndex) => {
                this.handleTreatmentProvided(itemValue);
              }}>
              <Picker.Item label="Select" value="" />
              {hospitalList.map((hospital, i) => {
                return (
                  <Picker.Item
                    label={hospital.label}
                    value={hospital.value}
                    key={i}
                  />
                );
              })}
            </Picker>
          </View>
          {(() => {
            if (
              this.context.getValue('treatmentProvidedAtSelected') === 'OTHER'
            ) {
              return (
                <TextInput
                  mode="outlined"
                  value={this.context.getValue('treatmentProvidedAt')}
                  label="Enter treatment provided at"
                  onChangeText={(value) => {
                    this.context.saveDataToParent({treatmentProvidedAt: value});
                  }}
                  style={styles.textinput}
                />
              );
            }
          })()}
        </View>
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Current Location :</Text>
          </View>
          <View>
            <TextInput
              mode="outlined"
              value={this.context.getValue('currentLocation')}
              label="Enter current location"
              onChangeText={(value) => {
                this.context.saveDataToParent({currentLocation: value});
              }}
              style={styles.textinput}
            />
          </View>
        </View>
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Present Patient Status :</Text>
          </View>
          <View>
            <TextInput
              mode="outlined"
              value={this.context.getValue('presentPatientStatus')}
              label="Enter status"
              onChangeText={(value) => {
                this.context.saveDataToParent({presentPatientStatus: value});
              }}
              style={styles.textinput}
            />
          </View>
        </View>
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Present Categorized as :</Text>
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.context.getValue('patientCategorizedAs')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({
                  patientCategorizedAs: itemValue,
                });
              }}>
              <Picker.Item label="Select" value="" />
              {patientCategorizedAsList.map((patientCategory, i) => {
                return (
                  <Picker.Item
                    label={patientCategory.label}
                    value={patientCategory.value}
                    key={i}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.buttonView}>
          <View style={{flex: 1}}>
            <Button
              mode="contained"
              style={styles.buttons}
              onPress={() =>
                this.context.saveDataToParent({
                  formName: this.context.getValue(
                    'PatientHealthStatusPreviousForm',
                  ),
                })
              }>
              Previous
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button
              mode="contained"
              style={styles.buttons}
              onPress={this.validateAndSubmit}>
              Submit Form
            </Button>
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
    marginHorizontal: 10,
  },
  buttons: {
    margin: 5,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  inputLabelView: {
    marginTop: 10,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 16,
    ...MontserratFont.bold,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  textinput: {
    marginBottom: 5,
    marginHorizontal: 10,
  },
  pickerView: {
    borderColor: '#888888',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 5,
    marginHorizontal: 10,
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
  mandatoryAsterisk: {
    fontWeight: 'bold',
    color: '#FF0000',
  },
});

export default PatientHealthStatus;
