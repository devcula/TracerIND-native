import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button,TextInput} from 'react-native-paper';
import PatientContext from '../../components/PatientContext';
import DateTimePicker from "react-native-modal-datetime-picker";

class BloodProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isDatePickerVisible: false,
      pickedDate: ""
    };
  }
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
  handleDatePicked = date => {
    const mdate = date.toString().split(" ");
    this.setState({
      pickedDate: mdate[1] + " " + mdate[2] + ", " + mdate[3]
    });
    this.hideDatePicker();
  };
  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  render() {
    const { date } = this.state;



    return (
      <ScrollView contentContainerStyle={styles.contentScreen}>
        
          <Text style={styles.text}>Blood Profile</Text>
          <Text style={styles.subtext}>Basic Blood Profile</Text>
          <DateTimePicker
          mode="date"
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
        />

          <TextInput
          mode="outlined"
          value={this.context.getValue('wbc')}
          label="Total WBC Count(K/microL)"
          onChangeText={(value) => {
            this.context.saveDataToParent({wbc: value});
          }}
          style={styles.textinput}
        />
                <TextInput
          mode="outlined"
          value={this.context.getValue('haemoglobin')}
          label="Haemoglobin (g/dL)"
          onChangeText={(value) => {
            this.context.saveDataToParent({haemoglobin: value});
          }}
          style={styles.textinput}

        />
                <TextInput
          mode="outlined"
          value={this.context.getValue('pcv')}
          label="Packed Cell Volume (%)"
          onChangeText={(value) => {
            this.context.saveDataToParent({pcv: value});
          }}
          style={styles.textinput}

        />
                  <TextInput
          mode="outlined"
          value={this.context.getValue('rbc')}
          label="Total RBC Count (mill/mm3)"
          onChangeText={(value) => {
            this.context.saveDataToParent({rbc: value});
          }}
          style={styles.textinput}
        />
                            <TextInput
          mode="outlined"
          value={this.context.getValue('mcv')}
          label="MCV (fL)"
          onChangeText={(value) => {
            this.context.saveDataToParent({mcv: value});
          }}
          style={styles.textinput}

        />

<TextInput
          mode="outlined"
          value={this.context.getValue('mch')}
          label="MCH (g)"
          onChangeText={(value) => {
            this.context.saveDataToParent({mch: value});
          }}
          style={styles.textinput}

        />
              <TextInput
          mode="outlined"
          value={this.context.getValue('mchc')}
          label="MCHC (g/dL)"
          onChangeText={(value) => {
            this.context.saveDataToParent({mchc: value});
          }}
          style={styles.textinput}

        />

            







<TextInput
          mode="outlined"
          value={this.context.getValue('mchc')}
          label="MCHC (g/dL)"
          onChangeText={(value) => {
            this.context.saveDataToParent({mchc: value});
          }}
          style={styles.textinput}

        />
          <TextInput
          mode="outlined"
          value={this.context.getValue('rdw')}
          label="Red Cell Distotion Width (%)"
          onChangeText={(value) => {
            this.context.saveDataToParent({rdw: value});
          }}
          style={styles.textinput}

        />
            <TextInput
          mode="outlined"
          value={this.context.getValue('platelet')}
          label="Platelet Count (K/microL)"
          onChangeText={(value) => {
            this.context.saveDataToParent({platelet: value});
          }}
          style={styles.textinput}

        />
                
        <Text style={styles.subtext}>Differential Count</Text>
        <TextInput
          mode="outlined"
          value={this.context.getValue('monocytes')}
          label="Monocytes"
          onChangeText={(value) => {
            this.context.saveDataToParent({monocytes: value});
          }}
          style={styles.textinput}

        />
          <TextInput
          mode="outlined"
          value={this.context.getValue('lymphocytes')}
          label="lymphocytes"
          onChangeText={(value) => {
            this.context.saveDataToParent({lymphocytes: value});
          }}
          style={styles.textinput}

        />
          <TextInput
          
          value={this.context.getValue('eosinophils:')}
          label="Eosinophils:"
          onChangeText={(value) => {
            this.context.saveDataToParent({eosinophils: value});
          }}
          style={styles.textinput}

        />
  
      
  




        <Button mode="contained" onPress={() => this.props.navigation.goBack()}>
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={() => this.props.navigation.navigate('TestDetailsForm')}>
          Next
        </Button>
      </ScrollView>
    );
  }
}
BloodProfile.contextType = PatientContext;


const styles = StyleSheet.create({
  contentScreen: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
   
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop:20,
    marginLeft:10,
  },
  subtext:{
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom:10,
    marginTop:20,
    marginLeft:10,

  },
  textinput:{
    marginBottom:5,
    marginTop:5,
    marginLeft:10,
    marginRight:10,

  }
});

export default BloodProfile;
