var express         = require('express');
var app             = express();
var cors            = require('cors');
var bodyParser      = require('body-parser');
var logger          = require('morgan');
var mongoose        = require('mongoose');
var routeConfig     = require('./config/routeConfig') ;
var errorHandlers   = require('./config/errorHandlers') ;
var settings = require('./config/settings');

app.use(logger('dev'));

app.use(express.static(__dirname + '/web'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(settings.connectionString);

routeConfig.registerRoutes(app);
errorHandlers.registerHandlers(app);

module.exports = app;
