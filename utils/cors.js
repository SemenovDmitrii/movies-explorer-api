const domainCors = [
  'http://sdv.nomoredomains.sbs.nomoredomains.icu',
  'https://sdv.nomoredomains.sbs.nomoredomains.icu',
  'http://api.sdv.nomoredomains.icu',
  'https://api.sdv.nomoredomains.icu',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];
  if (domainCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};

module.exports = domainCors;
