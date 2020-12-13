const initialState = {
  formName: 'BasicDetailsForm',
  //Basic Details: Start
  adhaarFirst: '',
  adhaarSecond: '',
  adhaarThird: '',
  mandal: '',
  phc: '',
  village_sec: '',
  village: '',
  name: '',
  surname: '',
  relation: '',
  gaurdian_name: '',
  age: '',
  gender: '',
  maritalstatus: '',
  phone: '',
  bloodgroup: '',
  PVTG: '',
  address: '',
  deworming: '',
  phcList: [],
  villageList: [],
  villageSecList: [],
  phcLoading: false,
  villageSecLoading: false,
  villageLoading: false,
  smoking: false,
  drinking: false,
  //Basic Details: End
  //Blood profile: Start
  dateOfBloodTest: '',
  wbc: '',
  pcv: '',
  rbc: '',
  mcv: '',
  mch: '',
  mchc: '',
  rdw: '',
  monocytes: '',
  lymphocytes: '',
  eosinophils: '',
  neutrophils: '',
  haemoglobin: '',
  hbClassification: '',
  platelet: '',
  //Blood profile: End
  //Hospital Details: Start
  hospitalAdmit: '',
  dateOfAdmit: '',
  refered: '',
  referredto: '',
  status: '',
  treatmentDone: '',
  dialysis: '',
  discharge: '',
  discharged: '',
  dischargeStatus: '',
  deceased: '',
  deathDate: '',
  placeOfDeath: '',
  causeOfDeath: '',
  recovery: '',
  otherReferedHospitalName: '',
  referredToSelected: 'NO',
  admittedToSelected: 'NO',
  btn: 'Submit',
  loading: false,
  //Hospital Details: End
  //Observations: Start
  weight: '',
  height: '',
  temperature: '',
  bloodpressure: '',
  heartrate: '',
  pulserate: '',
  respiratoryrate: '',
  bpm: '',
  fever: '',
  aches: '',
  cold: '',
  cough: '',
  fatigue: '',
  diarrohea: '',
  bleeding: '',
  infection: '',
  otherSymptoms: '',
  //Observations: End
  //Test Details: Start
  dateoftesting: '',
  serumCreatinine: '',
  bloodUrea: '',
  uricAcid: '',
  electrolytes_sodium: '',
  electrolytes_potassium: '',
  bun: '',
  pedalEdema: '',
  pedaltype: '',
  kidneystatus: '',
  ailments: '',
  // dialysis: '',
  doctorreq: '',
  opd: '',
  // btn: 'Submit',
  // loading: false,
  serumCreatinineRange: 'noRange',
  bloodUreaRange: 'noRange',
  uricAcidRange: 'noRange',
  sodiumRange: 'noRange',
  potassiumRange: 'noRange',
  bunRange: 'noRange',
  PatientHealthStatusPreviousForm: 'HospitalDetailsForm',
  //Test Details: End
  //Patient Health Status: Start
  diseaseType: '',
  diseaseTypeSelected: 'NO',
  diseaseCondition: '',
  onsetYears: '',
  onsetMonths: '',
  treatmentProvidedAt: '',
  treatmentProvidedAtSelected: 'NO',
  currentLocation: '',
  presentPatientStatus: '',
  patientCategorizedAs: '',
  //Patient Health Status: End
};

export default initialState;
