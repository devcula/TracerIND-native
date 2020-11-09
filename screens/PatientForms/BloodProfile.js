import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import PatientContext from '../../components/PatientContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';

class BloodProfile extends React.Component {
  constructor() {
    super();
    this.state = {showDatePicker: false};
  }
  onDateChange = (event, selectedDate) => {
    this.setState({showDatePicker: false});
    if (selectedDate) {
      this.context.saveDataToParent({
        dateOfBloodTest: `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}`,
      });
    }
  };

  render() {
    const hbClassifications = [
      {
        label: 'Children: 6-59 months of age',
        value: 'CHILD_6_TO_59_MONTHS',
      },
      {
        label: 'Children: 5-11 years of age',
        value: 'CHILD_5_TO_11_YEARS',
      },
      {
        label: 'Children: 12-14 years of age',
        value: 'CHILD_12_TO_14_YEARS',
      },
      {
        label: 'Non-Pregnant Women: 15 years or above',
        value: 'NP_WOMEN_15_PLUS_YEARS',
      },
      {
        label: 'Pregnant Women',
        value: 'P_WOMEN',
      },
      {
        label: 'Men: 15 years of age or above',
        value: 'MEN_15_PLUS_YEARS',
      },
    ];
    return (
      <ScrollView>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Blood Profile</Text>
        </View>
        <Text style={styles.subtext}>Basic Blood Profile</Text>
        <View>
          <View>
            <Text style={styles.inputLabel}>Date of Testing</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <TextInput
                mode="flat"
                value={this.context.getValue('dateOfBloodTest')}
                disabled
                style={styles.textinput}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                onPress={() => {
                  this.setState({showDatePicker: true});
                }}>
                <Icon name="calendar" color={'#000000'} size={30} />
              </Button>
            </View>
          </View>
        </View>
        {this.state.showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={
              this.context.getValue('dateOfBloodTest')
                ? new Date(this.context.getValue('dateOfBloodTest'))
                : new Date()
            }
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onDateChange}
          />
        )}
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
        <View style={styles.pickerView}>
          <Picker
            selectedValue={this.context.getValue('hbClassification')}
            onValueChange={(itemValue, itemIndex) => {
              this.context.saveDataToParent({hbClassification: itemValue});
            }}>
            <Picker.Item label="Select Age Classification" value="" />
            {hbClassifications.map((hbClassification, i) => {
              return (
                <Picker.Item
                  label={hbClassification.label}
                  value={hbClassification.value}
                  key={i}
                />
              );
            })}
          </Picker>
        </View>
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
          label="Monocytes (%)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({monocytes: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('lymphocytes')}
          label="Lymphocytes (%)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({lymphocytes: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('eosinophils')}
          label="Eosinophils (%)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({eosinophils: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('neutrophils')}
          label="Neutrophils (%)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({neutrophils: value});
          }}
          style={styles.textinput}
        />
        <View style={styles.buttonView}>
          <View style={{flex: 1}}>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={() =>
                this.context.saveDataToParent({formName: 'ObservationsForm'})
              }>
              Previous
            </Button>
          </View>

          <View style={{flex: 1}}>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={() =>
                this.context.saveDataToParent({formName: 'TestDetailsForm'})
              }>
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
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    fontSize: 30,
  },
  pickerView: {
    borderColor: '#888888',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
    marginHorizontal: 10,
  },
});

export default BloodProfile;
