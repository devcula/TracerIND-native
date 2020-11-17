import React from 'react';

import BasicDetails from './PatientForms/BasicDetails';
import BloodProfile from './PatientForms/BloodProfile';
import TestDetails from './PatientForms/TestDetails';
import Observations from './PatientForms/Observations';
import HospitalDetails from './PatientForms/HospitalDetails';
import PatientHealthStatus from './PatientForms/PatientHealthStatus';

export default function MainForm(props) {
  switch (props.formName) {
    case 'BasicDetailsForm':
      return <BasicDetails />;
    case 'ObservationsForm':
      return <Observations />;
    case 'BloodProfileForm':
      return <BloodProfile />;
    case 'TestDetailsForm':
      return <TestDetails />;
    case 'HospitalDetailsForm':
      return <HospitalDetails />;
    case 'PatientHealthStatusForm':
      return <PatientHealthStatus />;
  }
}
