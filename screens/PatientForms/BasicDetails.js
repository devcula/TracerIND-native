import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
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

  render() {
    // console.log(this.context);
    return (
      <ScrollView>
        <View style={styles.horizontalMargin}>
          <View style={styles.contentScreen}>
            <Text style={styles.text}>Basic Details</Text>
          </View>
          <View style={styles.inputLabelView}>
            <Text style={styles.inputLabel}>Adhaar</Text>
          </View>
          <View style={styles.adhaarView}>
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarFirst')}
              style={styles.adhaarInput}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarFirst: value});
              }}
            />
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarSecond')}
              style={styles.adhaarInput}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarSecond: value});
              }}
            />
            <TextInput
              mode="outlined"
              value={this.context.getValue('adhaarThird')}
              style={styles.adhaarInput}
              keyboardType="numeric"
              onChangeText={(value) => {
                this.context.saveDataToParent({adhaarThird: value});
              }}
            />
          </View>
          <View>
            <Picker
              selectedValue={this.context.getValue('mandal')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({mandal: itemValue});
                this.updatePHCList(itemValue);
              }}>
              <Picker.Item label="Select Mandal" value="" />
              {areaData.map((mandal, i) => {
                return (
                  <Picker.Item label={mandal.name} value={mandal.id} id={i} />
                );
              })}
            </Picker>
          </View>
          <View>
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
          <View>
            <Picker
              selectedValue={this.context.getValue('village_sec')}
              onValueChange={(itemValue, itemIndex) => {
                this.context.saveDataToParent({village_sec: itemValue});
                this.updateVillageList(itemValue);
              }}>
              <Picker.Item label="Select Village Sec." value="" />
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
          <View>
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
            <Button
              mode="contained"
              onPress={() =>
                this.props.navigation.navigate('ObservationsForm')
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
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  adhaarView: {
    flex: 1,
    flexDirection: 'row',
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
});

export default BasicDetails;
