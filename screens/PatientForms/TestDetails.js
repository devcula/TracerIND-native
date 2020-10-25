import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput, RadioButton} from 'react-native-paper';
import PatientContext from '../../components/PatientContext';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

class TestDetails extends React.Component {
  constructor() {
    super();
    this.state = {showDatePicker: false};
  }

  kidneyCheck = () => {
    if (this.context.getValue('kidneystatus') === 'abnormal') {
      return (
        <ScrollView>
          <TextInput
            multiline
            numberOfLines={3}
            style={styles.textinput}
            value={this.context.getValue('ailments')}
            label="Specify the Ailments"
            onChangeText={(value) => {
              this.context.saveDataToParent({ailments: value});
            }}
          />
          <View style={styles.rowFlex}>
            <View style={styles.contentScreen}>
              <Text style={styles.inputLabel}>Need for Dialysis :</Text>
            </View>
            <View style={[styles.rowFlex, {flex: 2}]}>
              <RadioButton.Group
                onValueChange={(value) =>
                  this.context.saveDataToParent({dialysis: value})
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
            <View style={[styles.rowFlex, {flex: 2}]}>
              <RadioButton.Group
                onValueChange={(value) =>
                  this.context.saveDataToParent({doctorreq: value})
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
            <Text style={styles.inputLabel}>Patient Type :</Text>
          </View>
          <View style={[styles.rowFlex, {flex: 2}]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({opd: value})
              }
              value={this.context.getValue('opd')}>
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

  pedalEdemaType = () => {
    if (this.context.getValue('pedalEdema') === 'Y') {
      return (
        <View style={styles.rowFlex}>
          <View style={styles.contentScreen}>
            <Text style={styles.inputLabel}>Pedal Type :</Text>
          </View>
          <View style={[styles.rowFlex, {flex: 2}]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({pedaltype: value})
              }
              value={this.context.getValue('pedaltype')}>
              <View style={styles.contentScreen}>
                <Text>Single Leg</Text>
                <RadioButton color="#14213D" value="single leg" />
              </View>
              <View style={styles.contentScreen}>
                <Text>Bilateral</Text>
                <RadioButton color="#14213D" value="bilateral" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
      );
    }
  };

  onDateChange = (event, selectedDate) => {
    this.setState({showDatePicker: false});
    if (selectedDate) {
      this.context.saveDataToParent({
        dateoftesting: `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}`,
      });
    }
  };

  render() {
    console.log('Rendering TestDetails');
    const {data} = this.state;
    return (
      <ScrollView>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Test Details</Text>
        </View>
        <View>
          <View>
            <Text style={styles.inputLabel}>Date of Testing</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <TextInput
                mode="flat"
                value={this.context.getValue('dateoftesting')}
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
              this.context.getValue('dateoftesting')
                ? new Date(this.context.getValue('dateoftesting'))
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
          value={this.context.getValue('serumCreatinine')}
          label="Serum Creatinine (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({serumCreatinine: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('bloodUrea')}
          label="Blood Urea (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({bloodUrea: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('uricAcid')}
          label="Sodium (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({uricAcid: value});
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
            this.context.saveDataToParent({electrolytes_sodium: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('electrolytes_potassium')}
          label="BUN (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({electrolytes_potassium: value});
          }}
          style={styles.textinput}
        />
        <TextInput
          mode="outlined"
          value={this.context.getValue('bun')}
          label="Uric Acid (mg/dl)"
          keyboardType="numeric"
          onChangeText={(value) => {
            this.context.saveDataToParent({bun: value});
          }}
          style={styles.textinput}
        />

        <View style={styles.rowFlex}>
          <View style={styles.contentScreen}>
            <Text style={styles.inputLabel}>Pedal Edema :</Text>
          </View>
          <View style={[styles.rowFlex, {flex: 2}]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({pedalEdema: value})
              }
              value={this.context.getValue('pedalEdema')}>
              <View style={styles.contentScreen}>
                <Text>Yes</Text>
                <RadioButton color="#14213D" value="Y" />
              </View>
              <View style={styles.contentScreen}>
                <Text>No</Text>
                <RadioButton color="#14213D" value="N" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
        {this.pedalEdemaType()}
        <View style={styles.rowFlex}>
          <View style={styles.contentScreen}>
            <Text style={styles.inputLabel}>Kidney Status :</Text>
          </View>
          <View style={[styles.rowFlex, {flex: 2}]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({kidneystatus: value})
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

        {(() => {
          if (
            this.context.getValue('opd') === 'true' &&
            this.context.getValue('doctorreq') === 'true' &&
            this.context.getValue('kidneystatus') === 'abnormal'
          ) {
            return (
              <View style={styles.buttonView}>
                <View style={{flex: 1}}>
                  <Button
                    style={styles.buttons}
                    mode="contained"
                    onPress={() =>
                      this.context.saveDataToParent({
                        formName: 'BloodProfileForm',
                      })
                    }>
                    Previous
                  </Button>
                </View>
                <View style={{flex: 1}}>
                  <Button
                    style={styles.buttons}
                    mode="contained"
                    onPress={() =>
                      this.context.saveDataToParent({
                        formName: 'HospitalDetailsForm',
                      })
                    }>
                    Next
                  </Button>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.buttonView}>
                <View style={{flex: 1}}>
                  <Button
                    style={styles.buttons}
                    mode="contained"
                    onPress={() =>
                      this.context.saveDataToParent({
                        formName: 'BloodProfileForm',
                      })
                    }>
                    Previous
                  </Button>
                </View>
                <Button
                  mode="contained"
                  style={styles.buttons}
                  onPress={() =>
                    this.context.submitForm(
                      () => alert('Saved'),
                      () => alert('Failed'),
                    )
                  }>
                  Submit Form
                </Button>
              </View>
            );
          }
        })()}
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
    marginHorizontal: 10,
    marginTop: 10,
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
});

TestDetails.contextType = PatientContext;
export default TestDetails;
