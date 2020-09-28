import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

class Observations extends React.Component {
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
    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        <View>
          <Text style={styles.text}>Observations</Text>
        </View>
        <Button mode="contained" onPress={() => this.props.navigation.goBack()}>
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={() => this.props.navigation.navigate('BloodProfileForm')}>
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

export default Observations;
