const mainRoute = require('express').Router();
const contacts = require('./contacts');
const messages = require('./messages');
const uploads = require('./uploads');

mainRoute.use('/contacts', contacts);
mainRoute.use('/compose', messages);
mainRoute.use('/uploads', uploads);


module.exports = mainRoute;