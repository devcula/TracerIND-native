const URI =
  process.env.NODE_ENV === 'production'
    ? 'https://api.tracerap.co.in/api/'
    : 'https://api-tracerind.covidindiataskforce.org/api/';
export default URI;
