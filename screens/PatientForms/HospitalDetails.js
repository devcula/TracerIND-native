import React, { useState } from 'react'
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button,TextInput, RadioButton, ThemeProvider} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import DatePicker from 'react-native-datepicker';
import PatientContext from '../../components/PatientContext';

class HospitalDetails extends React.Component {
  constructor() {
    super();
    this.state = { date: new Date() };
   
  }

  onDateChangeAdmit = (date) => {
    this.setState({ date })
    this.context.saveDataToParent({ dateOfAdmit: date })
  }

  onDateChangeDischarge = (date) => {
    this.setState({ date })
    this.context.saveDataToParent({ discharge: date })
  }


  onDateChangeDeath = (date) => {
    this.setState({ date })
    this.context.saveDataToParent({ deathDate: date })
  }



  
  

  render() {
    
    console.log('Rendering HospitalDetails');
    

    return (
      <ScrollView>
        <View>
          <Text style={styles.heading}>Hospital Details</Text>
        </View>
        <DatePicker
          date={this.state.date}
          mode="date"
          placeholder="date of admit"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 5,
              top: 5,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 50,
            },
          }}
          onDateChange={this.onDateChangeAdmit}
        />

   
        <View>
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
              <Picker.Item label="AH/Rampachodavaram" value="AH/Rampachodavaram" />
              <Picker.Item label="AH/Bhadrachalam" value="AH/Bhadrachalam" />
              <Picker.Item label="DH/Rajamundry" value="DH/Rajamundry" />
              <Picker.Item label="GGH/Kakinada" value="GGH/Kakinada" />
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
            if (this.context.getValue('refered')=== 'yes') {
              return (
                <View>
                <View>
                <Picker
                  selectedValue={this.context.getValue('hospitalAdmit')}
                  onValueChange={(itemValue, itemIndex) => {
                    this.context.saveDataToParent({hospitalAdmit: itemValue});
                  }}>
                  <Picker.Item label="Hospital Refered to" value="" />
                  <Picker.Item label="AH/Chintoor" value="AH/Chintoor" />
                  <Picker.Item label="AH/Rampachodavaram" value="AH/Rampachodavaram" />
                  <Picker.Item label="AH/Bhadrachalam" value="AH/Bhadrachalam" />
                  <Picker.Item label="DH/Rajamundry" value="DH/Rajamundry" />
                  <Picker.Item label="GGH/Kakinada" value="GGH/Kakinada" />
                </Picker>
              </View>
              <View>
                <Text style={styles.inputLabel}>Health Status at the time of referring </Text>
              </View>
                  <View>
              <TextInput
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
                style={styles.textinput}
                value={this.context.getValue('treatmentDone')}
                onChangeText={(value) => {
                  this.context.saveDataToParent({status: value});
                }}
              />
            </View>
            <View>
            <DatePicker
          date={this.state.date}
          mode="date"
          placeholder="date of discharge"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 5,
              top: 5,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 50,
            },
          }}
          onDateChange={this.onDateChangeDischarge}
        />

            </View>
            <View>
                <Text style={styles.inputLabel}>Recovery Status </Text>
              </View>
                  <View>
              <TextInput
                style={styles.textinput}
                value={this.context.getValue('recovery')}
                onChangeText={(value) => {
                  this.context.saveDataToParent({recovery: value});
                }}
              />
            </View>
            </View>

              
              );
            }
            else if(this.context.getValue('refered')=== 'no'){
              return(
                <View>
                  <View>
              <TextInput
                style={styles.textinput}
                value={this.context.getValue('treatmentDone')}
                label="Treatment Provided"
                onChangeText={(value) => {
                  this.context.saveDataToParent({status: value});
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
            if (this.context.getValue('deceased')==='yes') {
              return (
                <View>
                  <View>
                  <DatePicker
          date={this.state.date}
          mode="date"
          placeholder="date of death"
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
              top: 5,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 50,
            },
          }}
          onDateChange={this.onDateChangeDeath}
        />
                  </View>
                       <View>
              <TextInput
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading:{
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
});

export default HospitalDetails;
