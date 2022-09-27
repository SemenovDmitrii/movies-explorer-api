require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./utils/cors');
const limiter = require('./utils/rateLimiter');
const { MONGO_URL } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);

app.use(cors);
app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
