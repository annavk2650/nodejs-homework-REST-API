const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/auth');
const { errorHandlingMiddleware } = require('./middlewares');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use(errorHandlingMiddleware);

module.exports = app;
