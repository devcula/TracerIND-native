import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput, RadioButton, Checkbox} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';

const areaData = require('../../assets/data/areaData.json');

import PatientContext from '../../components/PatientContext';

class BasicDetails extends React.Component {
  updatePHCList = (mandal_id) => {
    this.context.saveDataToParent({
      phcList: [],
      phc: '',
      villageSecList: [],
      village_sec: '',
      villageList: [],
      village: '',
    });
    for (let i = 0; i < areaData.length; i++) {
      if (areaData[i].id === mandal_id) {
        this.context.saveDataToParent({phcList: areaData[i].phcs});
        return;
      }
    }
  };

  updateVillageSecList = (phc_id) => {
    this.context.saveDataToParent({
      villageSecList: [],
      village_sec: '',
      villageList: [],
      village: '',
    });
    let phcList = this.context.getValue('phcList');
    for (let i = 0; i < phcList.length; i++) {
      if (phcList[i].PHC_id === phc_id) {
        this.context.saveDataToParent({villageSecList: phcList[i].villageSecs});
        return;
      }
    }
  };

  updateVillageList = (villagesec_id) => {
    this.context.saveDataToParent({
      villageList: [],
      village: '',
    });
    let villageSecList = this.context.getValue('villageSecList');
    for (let i = 0; i < villageSecList.length; i++) {
      if (villageSecList[i].villagesec_id === villagesec_id) {
        this.context.saveDataToParent({
          villageList: villageSecList[i].villages,
        });
        return;
      }
    }
  };

  handleCheckboxClick = (field) => {
    let currentValue = this.context.getValue(field);
    let newValue = {};
    newValue[field] = !currentValue;
    this.context.saveDataToParent(newValue);
  };

  render() {
    // console.log(this.context);
    console.log('Rendering BasicDetails');
    return (
      <ScrollView>
        <View style={styles.horizontalMargin}>
          <View style={styles.contentScreen}>
            <Text style={styles.text}>Basic Details</Text>
          </View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Adhaar</Text>
          </View>
          <View style={styles.rowFlex}>
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarFirst')}
              style={styles.adhaarInput}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarFirst: value});
              }}
            />
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarSecond')}
              style={styles.adhaarInput}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarSecond: value});
              }}
            />
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarThird')}
              style={styles.adhaarInput}
              maxLength={4}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarThird: value});
              }}
            />
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.context.getValue('mandal')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({mandal: itemValue});
                this.updatePHCList(itemValue);
              }}>
              <Picker.Item label="Select Mandal" value="" />
              {areaData.map((mandal, i) => {
                return (
                  <Picker.Item label={mandal.name} value={mandal.id} key={i} />
                );
              })}
            </Picker>
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.context.getValue('phc')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({phc: itemValue});
                this.updateVillageSecList(itemValue);
              }}>
              <Picker.Item label="Select PHC" value="" />
              {this.context.getValue('phcList').map((phc, i) => {
                return (
                  <Picker.Item label={phc.name} value={phc.PHC_id} id={i} />
                );
              })}
            </Picker>
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.context.getValue('village_sec')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({village_sec: itemValue});
                this.updateVillageList(itemValue);
              }}>
              <Picker.Item label="Select Sub Center" value="" />
              {this.context.getValue('villageSecList').map((village_sec, i) => {
                return (
                  <Picker.Item
                    label={village_sec.name}
                    value={village_sec.villagesec_id}
                    id={i}
                  />
                );
              })}
            </Picker>
          </View>
          <View style={styles.pickerView}>
            <Picker
              selectedValue={this.context.getValue('village')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({village: itemValue});
              }}>
              <Picker.Item label="Select Village" value="" />
              {this.context.getValue('villageList').map((village, i) => {
                return (
                  <Picker.Item
                    label={village.name}
                    value={village.village_id}
                    id={i}
                  />
                );
              })}
            </Picker>
          </View>
          <View>
            <TextInput
              mode="outlined"
              value={this.context.getValue('name')}
              label="First Name"
              onChangeText={(value) => {
                this.context.saveDataToParent({name: value});
              }}
              style={styles.textinput}
            />
          </View>
          <View>
            <TextInput
              mode="outlined"
              value={this.context.getValue('surname')}
              label="Surname"
              onChangeText={(value) => {
                this.context.saveDataToParent({surname: value});
              }}
              style={styles.textinput}
            />
          </View>
          <View>
            <Picker
              selectedValue={this.context.getValue('relation')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({relation: itemValue});
              }}>
              <Picker.Item label="Select S/o, D/o, W/o" value="" />
              <Picker.Item label="Son Of" value="son" />
              <Picker.Item label="Daughter Of" value="daughter" />
              <Picker.Item label="Wife Of" value="wife" />
            </Picker>
          </View>
          {(() => {
            if (this.context.getValue('relation')) {
              return (
                <View>
                  <TextInput
                    mode="outlined"
                    value={this.context.getValue('gaurdian_name')}
                    label="Guardian Name"
                    onChangeText={(value) => {
                      this.context.saveDataToParent({gaurdian_name: value});
                    }}
                    style={styles.textinput}
                  />
                </View>
              );
            }
          })()}
          <View>
            <TextInput
              mode="outlined"
              keyboardType="numeric"
              value={this.context.getValue('age')}
              label="Age"
              maxLength={2}
              onChangeText={(value) => {
                this.context.saveDataToParent({age: value});
              }}
              style={styles.textinput}
            />
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.contentScreen}>
              <Text style={styles.inputLabel}>Sex :</Text>
            </View>
            <View style={[styles.rowFlex, {flex: 4}]}>
              <RadioButton.Group
                onValueChange={(value) =>
                  this.context.saveDataToParent({gender: value})
                }
                value={this.context.getValue('gender')}>
                <View style={styles.contentScreen}>
                  <Text>Male</Text>
                  <RadioButton color="#14213D" value="M" />
                </View>
                <View style={styles.contentScreen}>
                  <Text>Female</Text>
                  <RadioButton color="#14213D" value="F" />
                </View>
                <View style={styles.contentScreen}>
                  <Text>Transgender</Text>
                  <RadioButton color="#14213D" value="NB" />
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View>
            <Picker
              selectedValue={this.context.getValue('maritalstatus')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({maritalstatus: itemValue});
              }}>
              <Picker.Item label="Select Marital Status" value="" />
              <Picker.Item label="Single" value="single" />
              <Picker.Item label="Married" value="married" />
              <Picker.Item label="Separated" value="separated" />
              <Picker.Item label="Divorced" value="divorced" />
              <Picker.Item label="Widowed" value="widowed" />
            </Picker>
          </View>
          <View>
            <TextInput
              mode="outlined"
              keyboardType="phone-pad"
              maxLength={10}
              value={this.context.getValue('phone')}
              label="Phone Number"
              onChangeText={(value) => {
                this.context.saveDataToParent({phone: value});
              }}
              style={styles.textinput}
            />
          </View>
          <View>
            <TextInput
              mode="outlined"
              value={this.context.getValue('address')}
              label="Address"
              multiline
              numberOfLines={4}
              onChangeText={(value) => {
                this.context.saveDataToParent({address: value});
              }}
              style={styles.textinput}
            />
          </View>
          <View>
            <Picker
              selectedValue={this.context.getValue('bloodgroup')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({bloodgroup: itemValue});
              }}>
              <Picker.Item label="Select Blood Group" value="" />
              <Picker.Item label="O-" value="o-" />
              <Picker.Item label="O+" value="o+" />
              <Picker.Item label="A-" value="a-" />
              <Picker.Item label="A+" value="a+" />
              <Picker.Item label="B-" value="b-" />
              <Picker.Item label="B+" value="b+" />
              <Picker.Item label="AB-" value="ab-" />
              <Picker.Item label="AB+" value="ab+" />
              <Picker.Item label="Not Yet Known" value="N.A." />
            </Picker>
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.contentScreen}>
              <Text style={styles.inputLabel}>Deworming :</Text>
            </View>
            <View style={[styles.rowFlex, {flex: 2}]}>
              <RadioButton.Group
                onValueChange={(value) =>
                  this.context.saveDataToParent({deworming: value})
                }
                value={this.context.getValue('deworming')}>
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
              <Text style={styles.inputLabel}>Caste :</Text>
            </View>
            <View style={[styles.rowFlex, {flex: 3}]}>
              <RadioButton.Group
                onValueChange={(value) =>
                  this.context.saveDataToParent({PVTG: value})
                }
                value={this.context.getValue('PVTG')}>
                <View style={styles.contentScreen}>
                  <Text>ST</Text>
                  <RadioButton color="#14213D" value="ST" />
                </View>
                <View style={styles.contentScreen}>
                  <Text>Non ST</Text>
                  <RadioButton color="#14213D" value="NST" />
                </View>
                <View style={styles.contentScreen}>
                  <Text>PVTG</Text>
                  <RadioButton color="#14213D" value="PVTG" />
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <View style={styles.rowFlex}>
            <View style={styles.contentScreen}>
              <Text style={styles.inputLabel}>Habits :</Text>
            </View>
            <View style={[styles.rowFlex, {flex: 3}]}>
              <View style={styles.contentScreen}>
                <Text>Smoking</Text>
                <Checkbox
                  color="#14213D"
                  status={
                    this.context.getValue('smoking') ? 'checked' : 'unchecked'
                  }
                  onPress={() => {
                    this.handleCheckboxClick('smoking');
                  }}
                />
              </View>
              <View style={styles.contentScreen}>
                <Text>Drinking</Text>
                <Checkbox
                  color="#14213D"
                  status={
                    this.context.getValue('drinking') ? 'checked' : 'unchecked'
                  }
                  onPress={() => {
                    this.handleCheckboxClick('drinking');
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() =>
                this.context.saveDataToParent({formName: 'ObservationsForm'})
              }>
              Next
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

BasicDetails.contextType = PatientContext;

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textinput: {
    marginBottom: 5,
    // marginTop: 5,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1,
  },
  adhaarInput: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
  },
  inputLabelView: {
    marginLeft: 5,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  horizontalMargin: {
    marginHorizontal: 5,
  },
  button: {
    marginBottom: 10,
  },
  pickerView: {
    borderColor: '#888888',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
  },
});

export default BasicDetails;
