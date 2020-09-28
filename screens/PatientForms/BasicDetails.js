import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const areaData = require('../../assets/data/areaData.json');

import {PatientContext} from '../AddPatient';

class BasicDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mandal: '',
      phc: '',
      village_sec: '',
      vilage: '',
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
            value={this.context.data.mandal}
            label="Mandal"
            onChangeText={(value) =>
              this.context.methods.update({mandal: value})
            }
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

BasicDetails.contextType = PatientContext;

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
