import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const areaData = require('../../assets/data/areaData.json');

class BasicDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adhaarFirst: '',
      adhaarSecond: '',
      adhaarThird: '',
      mandal: props.getValue('mandal'),
      phc: props.getValue('phc'),
      village_sec: props.getValue('village_sec'),
      village: props.getValue('village'),
      name: props.getValue('name'),
      surname: props.getValue('surname'),
      relation: props.getValue('relation'),
      gaurdian_name: props.getValue('gaurdian_name'),
      age: props.getValue('age'),
      gender: props.getValue('gender'),
      maritalstatus: props.getValue('maritalstatus'),
      phone: props.getValue('phone'),
      bloodgroup: props.getValue('bloodgroup'),
      PVTG: props.getValue('PVTG'),
      address: props.getValue('address'),
      deworming: props.getValue('deworming'),
      phcList: props.getValue('phcList'),
      villageList: props.getValue('villageList'),
      villageSecList: props.getValue('villageSecList'),
      phcLoading: false,
      villageSecLoading: false,
      villageLoading: false,
      smoking: props.getValue('smoking'),
      drinking: props.getValue('drinking'),
    };
  }
  render() {
    console.log(this.context);
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>Basic details</Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            value={this.state.mandal}
            label="Mandal"
            onChangeText={(value) => {
              this.setState({mandal: value});
            }}
          />
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('ObservationsForm')}>
            Next
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default BasicDetails;
