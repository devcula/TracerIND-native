import React from 'react';
import {ScrollView, View, Text, StyleSheet, Alert} from 'react-native';
import {Button, TextInput, RadioButton, Checkbox} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import {MontserratFont} from '../../components/Constants';

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

  validateAndNext = () => {
    let adhaarFilledCount = 0;
    let incompleteAdhaarField = false;
    if (this.context.getValue('adhaarFirst')) {
      adhaarFilledCount++;
      if (this.context.getValue('adhaarFirst').length < 4) {
        incompleteAdhaarField = true;
      }
    }
    if (this.context.getValue('adhaarSecond')) {
      adhaarFilledCount++;
      if (this.context.getValue('adhaarSecond').length < 4) {
        incompleteAdhaarField = true;
      }
    }
    if (this.context.getValue('adhaarThird')) {
      adhaarFilledCount++;
      if (this.context.getValue('adhaarThird').length < 4) {
        incompleteAdhaarField = true;
      }
    }
    if (
      (adhaarFilledCount !== 0 && adhaarFilledCount !== 3) ||
      incompleteAdhaarField
    ) {
      Alert.alert(
        'Incomplete adhaar',
        'Either clear all adhaar fields or fill all of them completely',
      );
      return;
    }
    if (!this.context.getValue('mandal')) {
      Alert.alert('Missing value', 'Please Select Mandal');
      return;
    }
    if (!this.context.getValue('phc')) {
      Alert.alert('Missing value', 'Please Select PHC');
      return;
    }
    if (!this.context.getValue('village_sec')) {
      Alert.alert('Missing value', 'Please Select Sub center');
      return;
    }
    if (!this.context.getValue('village')) {
      Alert.alert('Missing value', 'Please Select Village');
      return;
    }
    if (!this.context.getValue('name')) {
      Alert.alert('Missing value', 'Please Enter First name');
      return;
    }
    if (!this.context.getValue('surname')) {
      Alert.alert('Missing value', 'Please Enter surname');
      return;
    }
    if (!this.context.getValue('relation')) {
      Alert.alert('Missing value', 'Please Select relation');
      return;
    }
    if (!this.context.getValue('gaurdian_name')) {
      Alert.alert('Missing value', 'Please Enter guardian name');
      return;
    }
    if (!this.context.getValue('age')) {
      Alert.alert('Missing value', 'Please Enter age');
      return;
    }
    if (!this.context.getValue('gender')) {
      Alert.alert('Missing value', 'Please Select gender');
      return;
    }
    if (!this.context.getValue('maritalstatus')) {
      Alert.alert('Missing value', 'Please Select marital status');
      return;
    }
    // if (!this.context.getValue('phone')) {
    //   Alert.alert('Missing value', 'Please Enter phone number');
    //   return;
    // }
    if (!this.context.getValue('address')) {
      Alert.alert('Missing value', 'Please Enter address');
      return;
    }
    if (!this.context.getValue('bloodgroup')) {
      Alert.alert('Missing value', 'Please Select Bloodgroup');
      return;
    }
    if (!this.context.getValue('PVTG')) {
      Alert.alert('Missing value', 'Please Select Caste');
      return;
    }
    this.context.saveDataToParent({formName: 'ObservationsForm'});
  };

  render() {
    // console.log(MontserratFont.bold);
    // console.log(this.context);
    console.log('Rendering BasicDetails');
    return (
      <ScrollView>
        {/* <View style={styles.horizontalMargin}> */}
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Basic Details</Text>
        </View>
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Adhaar (Optional)</Text>
          </View>
          <View style={styles.rowFlex}>
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarFirst')}
              style={styles.adhaarInput}
              maxLength={4}
              blurOnSubmit={false}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarFirst: value});
                if (value.length === 4) {
                  this.adhaarSecondInput.focus();
                }
              }}
            />
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarSecond')}
              style={styles.adhaarInput}
              maxLength={4}
              ref={(input) => {
                this.adhaarSecondInput = input;
              }}
              blurOnSubmit={false}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarSecond: value});
                if (value.length === 4) {
                  this.adhaarThirdInput.focus();
                }
              }}
            />
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarThird')}
              style={styles.adhaarInput}
              maxLength={4}
              ref={(input) => {
                this.adhaarThirdInput = input;
              }}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarThird: value});
              }}
            />
          </View>
        </View>
        <View style={[styles.rowFlex, styles.flexOne]}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              Mandal <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.pickerView, styles.flexOne]}>
            <Picker
              selectedValue={this.context.getValue('mandal')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({mandal: itemValue});
                this.updatePHCList(itemValue);
              }}>
              <Picker.Item label="Select" value="" />
              {areaData.map((mandal, i) => {
                return (
                  <Picker.Item label={mandal.name} value={mandal.id} key={i} />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={[styles.rowFlex, styles.flexOne]}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              PHC <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.pickerView, styles.flexOne]}>
            <Picker
              selectedValue={this.context.getValue('phc')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({phc: itemValue});
                this.updateVillageSecList(itemValue);
              }}>
              <Picker.Item label="Select" value="" />
              {this.context.getValue('phcList').map((phc, i) => {
                return (
                  <Picker.Item label={phc.name} value={phc.PHC_id} key={i} />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={[styles.rowFlex, styles.flexOne]}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              Sub Center <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.pickerView, styles.flexOne]}>
            <Picker
              selectedValue={this.context.getValue('village_sec')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({village_sec: itemValue});
                this.updateVillageList(itemValue);
              }}>
              <Picker.Item label="Select" value="" />
              {this.context.getValue('villageSecList').map((village_sec, i) => {
                return (
                  <Picker.Item
                    label={village_sec.name}
                    value={village_sec.villagesec_id}
                    key={i}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={[styles.rowFlex, styles.flexOne]}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              Village <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.pickerView, styles.flexOne]}>
            <Picker
              selectedValue={this.context.getValue('village')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({village: itemValue});
              }}>
              <Picker.Item label="Select" value="" />
              {this.context.getValue('villageList').map((village, i) => {
                return (
                  <Picker.Item
                    label={village.name}
                    value={village.village_id}
                    key={i}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        <View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>
              Name <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
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
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>
              Surname <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
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
        </View>
        <View style={[styles.rowFlex, styles.flexOne]}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              Relation <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.pickerView, styles.flexOne]}>
            <Picker
              selectedValue={this.context.getValue('relation')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({relation: itemValue});
              }}>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Son Of" value="son" />
              <Picker.Item label="Daughter Of" value="daughter" />
              <Picker.Item label="Wife Of" value="wife" />
            </Picker>
          </View>
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
        <View style={[styles.rowFlex, styles.flexOne]}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              Age <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[{marginTop: 5, marginHorizontal: 10}, styles.flexOne]}>
            <TextInput
              mode="outlined"
              keyboardType="numeric"
              value={this.context.getValue('age')}
              maxLength={2}
              onChangeText={(value) => {
                this.context.saveDataToParent({age: value});
              }}
              // style={styles.textinput}
            />
          </View>
        </View>
        <View style={[styles.rowFlex, {marginTop: 10}]}>
          <View
            style={[
              styles.inputLabelView,
              {flex: 2, alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Text style={styles.inputLabel}>
              Gender <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.rowFlex, {flex: 6}]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({gender: value})
              }
              value={this.context.getValue('gender')}>
              <View style={styles.contentScreen}>
                <Text style={MontserratFont.semiBold}>Male</Text>
                <RadioButton color="#14213D" value="M" />
              </View>
              <View style={styles.contentScreen}>
                <Text style={MontserratFont.semiBold}>Female</Text>
                <RadioButton color="#14213D" value="F" />
              </View>
              <View style={styles.contentScreen}>
                <Text style={MontserratFont.semiBold}>Transgender</Text>
                <RadioButton color="#14213D" value="NB" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={[styles.rowFlex, styles.flexOne]}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              Marital Status <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.pickerView, styles.flexOne]}>
            <Picker
              selectedValue={this.context.getValue('maritalstatus')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({maritalstatus: itemValue});
              }}>
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Single" value="single" />
              <Picker.Item label="Married" value="married" />
              <Picker.Item label="Separated" value="separated" />
              <Picker.Item label="Divorced" value="divorced" />
              <Picker.Item label="Widowed" value="widowed" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputLabelView}>
          <Text style={styles.inputLabel}>Phone Number</Text>
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
        <View style={styles.inputLabelView}>
          <Text style={styles.inputLabel}>
            Address <Text style={styles.mandatoryAsterisk}>*</Text>
          </Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            value={this.context.getValue('address')}
            // label="Address"
            multiline
            numberOfLines={4}
            onChangeText={(value) => {
              this.context.saveDataToParent({address: value});
            }}
            style={styles.textinput}
          />
        </View>
        <View style={[styles.rowFlex, styles.flexOne]}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              Blood group <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.pickerView, styles.flexOne]}>
            <Picker
              selectedValue={this.context.getValue('bloodgroup')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({bloodgroup: itemValue});
              }}>
              <Picker.Item label="Select" value="" />
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
        </View>
        <View style={styles.rowFlex}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>
              Caste <Text style={styles.mandatoryAsterisk}>*</Text>
            </Text>
          </View>
          <View style={[styles.rowFlex, {flex: 2}, {marginTop: 10}]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({PVTG: value})
              }
              value={this.context.getValue('PVTG')}>
              <View style={styles.contentScreen}>
                <Text style={MontserratFont.semiBold}>ST</Text>
                <RadioButton color="#14213D" value="ST" />
              </View>
              <View style={styles.contentScreen}>
                <Text style={MontserratFont.semiBold}>Non ST</Text>
                <RadioButton color="#14213D" value="NST" />
              </View>
              <View style={styles.contentScreen}>
                <Text style={MontserratFont.semiBold}>PVTG</Text>
                <RadioButton color="#14213D" value="PVTG" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={styles.rowFlex}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>Deworming</Text>
          </View>
          <View style={[styles.rowFlex, {flex: 2}]}>
            <RadioButton.Group
              onValueChange={(value) =>
                this.context.saveDataToParent({deworming: value})
              }
              value={this.context.getValue('deworming')}>
              <View style={styles.contentScreen}>
                <Text style={MontserratFont.semiBold}>Yes</Text>
                <RadioButton color="#14213D" value="true" />
              </View>
              <View style={styles.contentScreen}>
                <Text style={MontserratFont.semiBold}>No</Text>
                <RadioButton color="#14213D" value="false" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
        <View style={styles.rowFlex}>
          <View style={[styles.inputLabelView, styles.contentScreen]}>
            <Text style={styles.inputLabel}>Habits</Text>
          </View>
          <View style={[styles.rowFlex, {flex: 2}]}>
            <View style={styles.contentScreen}>
              <Text style={MontserratFont.semiBold}>Smoking</Text>
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
              <Text style={MontserratFont.semiBold}>Drinking</Text>
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
        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => this.validateAndNext()}>
            Next
          </Button>
        </View>
        {/* </View> */}
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
    marginHorizontal: 10,
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
    marginTop: 10,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  inputLabel: {
    ...MontserratFont.bold,
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  horizontalMargin: {
    marginHorizontal: 5,
  },
  buttonView: {
    margin: 10,
  },
  button: {
    marginBottom: 10,
  },
  pickerView: {
    borderColor: '#888888',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    marginHorizontal: 10,
  },
  mandatoryAsterisk: {
    fontWeight: 'bold',
    color: '#FF0000',
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
    // fontWeight: 'bold',
    ...MontserratFont.bold,
    fontSize: 30,
  },
});

export default BasicDetails;
