const domainCors = {
  origin: [
    'http://api.sdv.nomoredomains.icu',
    'https://api.sdv.nomoredomains.icu',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
};

module.exports = domainCors;
