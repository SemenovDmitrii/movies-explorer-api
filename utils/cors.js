const domainCors = {
  origin: [
    'http://api.sdv.nomoredomains.sbs',
    'https://api.sdv.nomoredomains.sbs',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
};

module.exports = domainCors;
