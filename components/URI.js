const URI =
  process.env.NODE_ENV === 'production'
    ? 'https://api-tracerind.covidindiataskforce.org/api/'
    : 'https://api-tracerind.covidindiataskforce.org/api/';
export default URI;
