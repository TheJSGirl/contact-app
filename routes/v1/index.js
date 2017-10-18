const mainRoute = require('express').Router();
const contacts = require('./contacts');
const messages = require('./messages');

mainRoute.use('/contacts', contacts);
mainRoute.use('/compose', messages);


module.exports = mainRoute;