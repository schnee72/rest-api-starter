const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3000;
const app = express();
const routes = require('./routes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bookapi');

app.use(helmet());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('short'));
app.use('/', routes);
app.listen(port, () => console.log('API running on port ' + port));

module.exports = app;