import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import PatientContext from '../../components/PatientContext';
//  import DatePicker from 'react-native-date-picker'

import DatePicker from 'react-native-datepicker';

class TestDetails extends React.Component {
  constructor() {
    super();
    this.state = { date: new Date() };
  }

  kidneyCheck = () => {
    if (this.context.getValue('kidneystatus') === 'abnormal') {
      return (
        <ScrollView>
          <TextInput
            style={styles.textinput}
            value={this.context.getValue('ailments')}
            label="Specify the Ailments"
            onChangeText={(value) => {
              this.context.saveDataToParent({ ailments: value });
            }}
          />
          <View style={styles.rowFlex}>
            <View style={styles.contentScreen}>
              <Text style={styles.inputLabel}>Need for Dialysis :</Text>
            </View>
            <View style={[styles.rowFlex, { flex: 2 }]}>
              <RadioButton.Group
                onValueChange={(value) =>
                  this.context.saveDataToParent({ dialysis: value })
                }
                value={this.context.getValue('dialysis')}>
                <View style={styles.contentScreen}>
                  <Text>Yes</Text>
                  <RadioButton color="#14213D" value="true" />
                </View>
                <View style={styles.contentScreen}>
                  <Text>No</Text>
                  <RadioButton color="#14213D" value="false" />
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.contentScreen}>
              <Text style={styles.inputLabel}>Need for doctor :</Text>
            </View>
            <View style={[styles.rowFlex, { flex: 2 }]}>
              <RadioButton.Group
                onValueChange={(value) =>
                  this.context.saveDataToParent({ doctorreq: value })
                }
                value={this.context.getValue('doctorreq')}>
                <View style={styles.contentScreen}>
                  <Text>Yes</Text>
                  <RadioButton color="#14213D" value="true" />
                </View>
                <View style={styles.contentScreen}>
                  <Text>No</Text>
                  <RadioButton color="#14213D" value="false" />
                </View>
              </RadioButton.Group>
            </View>
          </View>
        </ScrollView>
      );
    }
  };

  patientTypeCheck = () => {
    if (this.context.getValue('doctorreq') === 'true') {
      return (
        <View style={styles.rowFlex}>
          <View style={styles.contentScreen}>
            <Text style={styles.inputLabel}>Need for Dialysis :</Text>
          </View>
          <View style={[styles.rowFlex, { flex: 2 }]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({ opd: value })
              }
              value={this.context.getValue('dialysis')}>
              <View style={styles.contentScreen}>
                <Text>IP</Text>
                <RadioButton color="#14213D" value="true" />
              </View>
              <View style={styles.contentScreen}>
                <Text>OP</Text>
                <RadioButton color="#14213D" value="false" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
      );
    }
  };

  onDateChangeEvent = (date) => {
    this.setState({ date })
    this.context.saveDataToParent({ dateoftesting: date })
  }

  render() {
    console.log('Rendering TestDetails');
    const { data } = this.state;
    return (
      <ScrollView>
        <View>
          <Text style={styles.text}>Test Details</Text>
        </View>
        {/* <DatePicker
      date={this.state.date}
      onDateChange={date => this.setState({date})}
    /> */}
        <DatePicker
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={this.onDateChangeEvent}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('serumCreatinine')}
          label="Serum Creatinine (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({ serumCreatinine: value });
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('bloodUrea')}
          label="Blood Urea (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({ bloodUrea: value });
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('uricAcid')}
          label="Sodium (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({ uricAcid: value });
          }}
          style={styles.textinput}
        />
        <View>
          <Text style={styles.text}>Electrolytes</Text>
        </View>
        <TextInput
          mode="outlined"
          value={this.context.getValue('electrolytes_sodium')}
          label="Potassium (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({ electrolytes_sodium: value });
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('electrolytes_potassium')}
          label="BUN (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({ electrolytes_potassium: value });
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('bun')}
          label="Uric Acid (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({ bun: value });
          }}
          style={styles.textinput}
        />

        <View style={styles.rowFlex}>
          <View style={styles.contentScreen}>
            <Text style={styles.inputLabel}>Pedal Edema :</Text>
          </View>
          <View style={[styles.rowFlex, { flex: 2 }]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({ pedalEdema: value })
              }
              value={this.context.getValue('pedalEdema')}>
              <View style={styles.contentScreen}>
                <Text>Yes</Text>
                <RadioButton color="#14213D" value="true" />
              </View>
              <View style={styles.contentScreen}>
                <Text>No</Text>
                <RadioButton color="#14213D" value="false" />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        <View style={styles.rowFlex}>
          <View style={styles.contentScreen}>
            <Text style={styles.inputLabel}>Kidney Status :</Text>
          </View>
          <View style={[styles.rowFlex, { flex: 2 }]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({ kidneystatus: value })
              }
              value={this.context.getValue('kidneystatus')}>
              <View style={styles.contentScreen}>
                <Text>Good</Text>
                <RadioButton color="#14213D" value="good" />
              </View>
              <View style={styles.contentScreen}>
                <Text>Abnormal</Text>
                <RadioButton color="#14213D" value="abnormal" />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        {this.kidneyCheck()}
        {this.patientTypeCheck()}
        <View style={styles.buttonView}>
          <View style={{ flex: 1 }}>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={() =>
                this.context.saveDataToParent({ formName: 'BloodProfileForm' })
              }>
              Previous
            </Button>
          </View>

          <View style={{ flex: 1 }}>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={() =>
                this.context.saveDataToParent({ formName: 'HospitalDetailsForm' })
              }>
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    //  alignItems: 'center',
    //  justifyContent: 'center',
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
  rowFlex: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

TestDetails.contextType = PatientContext;
export default TestDetails;
