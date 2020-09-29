import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const areaData = require('../../assets/data/areaData.json');

import PatientContext from '../../components/PatientContext';

class BasicDetails extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     mandal: '',
  //   };
  // }

  componentDidMount() {
    // console.log(this.context);
    // this.setState({mandal: this.context.getValue('mandal')});
  }

  render() {
    // console.log(this.context);
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>
            {this.context.getValue('phc')}
            {this.context.getValue('mandal')}
            {this.context.getValue('pkid')}
          </Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            value={this.context.getValue('mandal')}
            label="Mandal"
            onChangeText={(value) => {
              this.context.saveDataToParent({mandal: value});
            }}
          />
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('ObservationsForm')}>
            Next
          </Button>
          <Button mode="contained" onPress={() => this.context.resetForm()}>
            Reset form
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
