const URI =
  process.env.NODE_ENV === 'production'
    ? 'https://api.tracerap.co.in/api/'
    : 'https://api.tracerap.co.in/api/';
export default URI;
