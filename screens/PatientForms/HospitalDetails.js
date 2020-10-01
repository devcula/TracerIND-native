import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import PatientContext from '../../components/PatientContext';
class HospitalDetails extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>Hospital Details</Text>
        </View>
        <Button mode="contained" onPress={() => this.props.navigation.goBack()}>
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            this.context.submitForm(
              () => alert('Saved'),
              () => alert('Failed'),
            )
          }>
          Submit Form
        </Button>
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
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default HospitalDetails;
