import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

class TestDetails extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log('Rendering TestDetails');
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>Test Details</Text>
        </View>
        <Button mode="contained" onPress={() => this.props.navigation.goBack()}>
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={() => this.props.navigation.navigate('HospitalDetailsForm')}>
          Next
        </Button>
      </ScrollView>
    );
  }
}

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

export default TestDetails;
