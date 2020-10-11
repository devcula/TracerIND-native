import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import PatientContext from '../../components/PatientContext';
class HospitalDetails extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('Rendering HospitalDetails');
    return (
      <ScrollView>
        <View>
          <Text style={styles.text}>Hospital Details</Text>
        </View>
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
  text: {
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
});

export default HospitalDetails;
