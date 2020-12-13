const MontserratFont = {
  regular: {
    fontFamily: 'Montserrat-Regular',
    fontWeight: '200',
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '200',
  },
  semiBold: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '200',
  },
};

const patientCategories = [
  {
    label: 'Healthy',
    value: 'healthy',
  },
  {
    label: 'With Mild Illness',
    value: 'mild_illness',
  },
  {
    label: 'Moderately ill',
    value: 'moderately_ill',
  },
  {
    label: 'Severely ill',
    value: 'severely_ill',
  },
];

const diseaseList = [
  {
    label: 'Anaemia',
    value: 'anaemia',
  },
  {
    label: 'Cancer',
    value: 'cancer',
  },
  {
    label: 'Diabetes',
    value: 'diabetes',
  },
  {
    label: 'Heart Related',
    value: 'heart_related',
  },
  {
    label: 'Kidney Related',
    value: 'kidney_related',
  },
  {
    label: 'Lung Related',
    value: 'lung_related',
  },
  {
    label: 'Liver Related',
    value: 'liver_related',
  },
  {
    label: 'Pedal Edema',
    value: 'pedal_enema',
  },
  {
    label: 'Paralysis',
    value: 'paralysis',
  },
  {
    label: 'Thalessemia',
    value: 'thalessemia',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const defaultHomeState = {
  severeCount: 'XXX',
  moderateCount: 'XXX',
  mildCount: 'XXX',
  totalCount: 'XXX',
  disease1: {
    name: 'Disease 1',
    count: 'XXX',
  },
  disease2: {
    name: 'Disease 2',
    count: 'XXX',
  },
  disease3: {
    name: 'Disease 3',
    count: 'XXX',
  },
  disease4: {
    name: 'Disease 4',
    count: 'XXX',
  },
  disease5: {
    name: 'Disease 5',
    count: 'XXX',
  },
};

module.exports = {
  MontserratFont,
  patientCategories,
  diseaseList,
  defaultHomeState,
};
