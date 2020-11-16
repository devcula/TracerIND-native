import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput, RadioButton} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import PatientContext from '../../components/PatientContext';

class HospitalDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      showAdmitDatePicker: false,
      showDeathDatePicker: false,
      showDischargeDatePicker: false,
    };
  }

  onDateChangeAdmit = (date) => {
    this.setState({date});
    this.context.saveDataToParent({dateOfAdmit: date});
  };

  onDateChangeDischarge = (date) => {
    this.setState({date});
    this.context.saveDataToParent({discharge: date});
  };

  onDateChangeDeath = (date) => {
    this.setState({date});
    this.context.saveDataToParent({deathDate: date});
  };

  onAdmitDateChange = (event, selectedDate) => {
    this.setState({showAdmitDatePicker: false});
    if (selectedDate) {
      this.context.saveDataToParent({
        dateOfAdmit: `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}`,
      });
    }
  };

  onDischargeDateChange = (event, selectedDate) => {
    this.setState({showDischargeDatePicker: false});
    if (selectedDate) {
      this.context.saveDataToParent({
        discharge: `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}`,
      });
    }
  };

  onDeathDateChange = (event, selectedDate) => {
    this.setState({showDeathDatePicker: false});
    if (selectedDate) {
      this.context.saveDataToParent({
        deathDate: `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}`,
      });
    }
  };

  handleReferredTo = (value) => {
    if (value === '') {
      this.context.saveDataToParent({referredToSelected: 'NO', referredto: ''});
    } else if (value === 'other') {
      this.context.saveDataToParent({
        referredToSelected: 'OTHER',
        referredto: '',
      });
    } else {
      this.context.saveDataToParent({
        referredto: value,
        referredToSelected: 'YES',
      });
    }
  };

  render() {
    console.log('Rendering HospitalDetails');

    return (
      <ScrollView>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Hospital Details</Text>
        </View>
        <View>
          <View>
            <Text style={styles.inputLabel}>Date of Admit</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <TextInput
                mode="flat"
                value={this.context.getValue('dateOfAdmit')}
                disabled
                style={styles.textinput}
              />
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                onPress={() => {
                  this.setState({showAdmitDatePicker: true});
                }}>
                <Icon name="calendar" color={'#000000'} size={30} />
              </Button>
            </View>
          </View>
        </View>
        {this.state.showAdmitDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={
              this.context.getValue('dateOfAdmit')
                ? new Date(this.context.getValue('dateOfAdmit'))
                : new Date()
            }
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onAdmitDateChange}
          />
        )}

        <View style={styles.pickerView}>
          <Picker
            selectedValue={this.context.getValue('hospitalAdmit')}
            onValueChange={(itemValue, itemIndex) => {
              this.context.saveDataToParent({hospitalAdmit: itemValue});
            }}>
            <Picker.Item label="Hospital Admitted in" value="" />
            <Picker.Item label="PHC/Tulasipaka" value="PHC/Tulasipaka" />
            <Picker.Item label="PHC/E.D Pally" value="PHC/E.D Pally" />
            <Picker.Item label="PHC/Laxmipuram" value="PHC/Laxmipuram" />
            <Picker.Item label="PHC/Gowridevipeta" value="PHC/Gowridevipeta" />
            <Picker.Item label="PHC/Kuturu" value="PHC/Kuturu" />
            <Picker.Item label="PHC/Rekhapally" value="PHC/Rekhapally" />
            <Picker.Item label="PHC/Jeediguppa" value="PHC/Jeediguppa" />
            <Picker.Item label="AH/Chintoor" value="AH/Chintoor" />
            <Picker.Item
              label="AH/Rampachodavaram"
              value="AH/Rampachodavaram"
            />
            <Picker.Item label="AH/Bhadrachalam" value="AH/Bhadrachalam" />
            <Picker.Item label="DH/Rajamundry" value="DH/Rajamundry" />
            <Picker.Item label="GGH/Kakinada" value="GGH/Kakinada" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View style={styles.rowFlex}>
          <View style={styles.contentScreen}>
            <Text style={styles.inputLabel}>Refered to Any Hospital :</Text>
          </View>
          <View style={[styles.rowFlex, {flex: 2}]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({refered: value})
              }
              value={this.context.getValue('refered')}>
              <View style={styles.contentScreen}>
                <Text>Yes</Text>
                <RadioButton color="#14213D" value="yes" />
              </View>
              <View style={styles.contentScreen}>
                <Text>No</Text>
                <RadioButton color="#14213D" value="no" />
              </View>
            </RadioButton.Group>
          </View>
        </View>

        {(() => {
          if (this.context.getValue('refered') === 'yes') {
            return (
              <View>
                <View style={styles.pickerView}>
                  <Picker
                    selectedValue={
                      this.context.getValue('referredToSelected') === 'OTHER'
                        ? 'other'
                        : this.context.getValue('referredto')
                    }
                    onValueChange={(itemValue, itemIndex) => {
                      // this.context.saveDataToParent({referredto: itemValue});
                      this.handleReferredTo(itemValue);
                    }}>
                    <Picker.Item label="Hospital Refered to" value="" />
                    <Picker.Item label="AH/Chintoor" value="AH/Chintoor" />
                    <Picker.Item
                      label="AH/Rampachodavaram"
                      value="AH/Rampachodavaram"
                    />
                    <Picker.Item
                      label="AH/Bhadrachalam"
                      value="AH/Bhadrachalam"
                    />
                    <Picker.Item label="DH/Rajamundry" value="DH/Rajamundry" />
                    <Picker.Item label="GGH/Kakinada" value="GGH/Kakinada" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
                {(() => {
                  if (this.context.getValue('referredToSelected') === 'OTHER') {
                    return (
                      <TextInput
                        mode="outlined"
                        style={styles.textinput}
                        value={this.context.getValue('referredto')}
                        label="Enter Hospital Name"
                        onChangeText={(value) => {
                          this.context.saveDataToParent({referredto: value});
                        }}
                      />
                    );
                  }
                })()}
                <View>
                  <Text style={styles.inputLabel}>
                    Health Status at the time of referring{' '}
                  </Text>
                </View>
                <View>
                  <TextInput
                    mode="outlined"
                    style={styles.textinput}
                    value={this.context.getValue('status')}
                    label="Health Status at the time of referring "
                    onChangeText={(value) => {
                      this.context.saveDataToParent({status: value});
                    }}
                  />
                </View>

                <View style={styles.rowFlex}>
                  <View style={styles.contentScreen}>
                    <Text style={styles.inputLabel}>Need for Dialysis:</Text>
                  </View>
                  <View style={[styles.rowFlex, {flex: 2}]}>
                    <RadioButton.Group
                      onValueChange={(value) =>
                        this.context.saveDataToParent({dialysis: value})
                      }
                      value={this.context.getValue('dialysis')}>
                      <View style={styles.contentScreen}>
                        <Text>Yes</Text>
                        <RadioButton color="#14213D" value="yes" />
                      </View>
                      <View style={styles.contentScreen}>
                        <Text>No</Text>
                        <RadioButton color="#14213D" value="no" />
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>

                <View>
                  <Text style={styles.inputLabel}>Treatment Provided </Text>
                </View>
                <View>
                  <TextInput
                    mode="outlined"
                    style={styles.textinput}
                    value={this.context.getValue('treatmentDone')}
                    onChangeText={(value) => {
                      this.context.saveDataToParent({treatmentDone: value});
                    }}
                  />
                </View>
                <View>
                  <View>
                    <Text style={styles.inputLabel}>Date of Discharge</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                      <TextInput
                        mode="flat"
                        value={this.context.getValue('discharge')}
                        disabled
                        style={styles.textinput}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Button
                        onPress={() => {
                          this.setState({showDischargeDatePicker: true});
                        }}>
                        <Icon name="calendar" color={'#000000'} size={30} />
                      </Button>
                    </View>
                  </View>
                </View>
                {this.state.showDischargeDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={
                      this.context.getValue('discharge')
                        ? new Date(this.context.getValue('discharge'))
                        : new Date()
                    }
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={this.onDischargeDateChange}
                  />
                )}
                <View>
                  <Text style={styles.inputLabel}>Recovery Status </Text>
                </View>
                <View>
                  <TextInput
                    mode="outlined"
                    style={styles.textinput}
                    value={this.context.getValue('recovery')}
                    onChangeText={(value) => {
                      this.context.saveDataToParent({recovery: value});
                    }}
                  />
                </View>
              </View>
            );
          } else if (this.context.getValue('refered') === 'no') {
            return (
              <View>
                <View>
                  <TextInput
                    style={styles.textinput}
                    value={this.context.getValue('treatmentDone')}
                    label="Treatment Provided"
                    onChangeText={(value) => {
                      this.context.saveDataToParent({treatmentDone: value});
                    }}
                  />
                </View>
                <View style={styles.rowFlex}>
                  <View style={styles.contentScreen}>
                    <Text style={styles.inputLabel}>Deceased:</Text>
                  </View>
                  <View style={[styles.rowFlex, {flex: 2}]}>
                    <RadioButton.Group
                      onValueChange={(value) =>
                        this.context.saveDataToParent({deceased: value})
                      }
                      value={this.context.getValue('deceased')}>
                      <View style={styles.contentScreen}>
                        <Text>Yes</Text>
                        <RadioButton color="#14213D" value="yes" />
                      </View>
                      <View style={styles.contentScreen}>
                        <Text>No</Text>
                        <RadioButton color="#14213D" value="no" />
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
              </View>
            );
          }
        })()}

        {(() => {
          if (this.context.getValue('deceased') === 'yes') {
            return (
              <View>
                <View>
                  <View>
                    <Text style={styles.inputLabel}>Date of Death</Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 3}}>
                      <TextInput
                        mode="flat"
                        value={this.context.getValue('deathDate')}
                        disabled
                        style={styles.textinput}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Button
                        onPress={() => {
                          this.setState({showDeathDatePicker: true});
                        }}>
                        <Icon name="calendar" color={'#000000'} size={30} />
                      </Button>
                    </View>
                  </View>
                </View>
                {this.state.showDeathDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={
                      this.context.getValue('deathDate')
                        ? new Date(this.context.getValue('deathDate'))
                        : new Date()
                    }
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={this.onDeathDateChange}
                  />
                )}
                <View>
                  <TextInput
                    mode="outlined"
                    style={styles.textinput}
                    value={this.context.getValue('causeOfDeath')}
                    label="Cause of Death "
                    onChangeText={(value) => {
                      this.context.saveDataToParent({causeOfDeath: value});
                    }}
                  />
                </View>

                <View>
                  <TextInput
                    mode="outlined"
                    value={this.context.getValue('placeOfDeath')}
                    label="Place of Death "
                    onChangeText={(value) => {
                      this.context.saveDataToParent({placeOfDeath: value});
                    }}
                    style={styles.textinput}
                  />
                </View>
              </View>
            );
          }
        })()}

        <View style={styles.buttonView}>
          <View style={styles.contentScreen}>
            <Button
              mode="contained"
              style={styles.buttons}
              onPress={() =>
                this.context.saveDataToParent({formName: 'TestDetailsForm'})
              }>
              Previous
            </Button>
          </View>

          <View style={styles.contentScreen}>
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
        </View>
      </ScrollView>
    );
  }
}

HospitalDetails.contextType = PatientContext;

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    marginTop: 5,
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
});

export default HospitalDetails;
