// Imports /////////////////////////////////////////////////////////////////////
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var app = express();

var jsonMailRoutes = require('./routes/json_mail_routes');
var jsonLogRoutes = require('./routes/json_log_routes');
var accessDb = require('./db/models/access_log');

// All env variables ///////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('db name', 'Mail');

// Connect to Mongo ////////////////////////////////////////////////////////////
mongoose.connect('mongodb://localhost/' + app.get('db name'));

// Middleware //////////////////////////////////////////////////////////////////
app.use(function(req, res, next) {
  var logValues = {
    reqHttpMethod: req.method,
    reqIp: req.ip,
    reqUrl: req.url,
    reqHeaders: req.headers
  };

  var accessLogEntry = new accessDb.AccessLog(logValues);
  accessLogEntry.save(function(err) {
    if (err) {
      console.log('TODO: json logRequest could not save log to db.');
    }
    next();
  });
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development settings ////////////////////////////////////////////////////////
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

////////////////////////////////////////////////////////////////////////////////
// Routes //////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.send('todo: welcome');
});

// Json routes /////////////////////////////////////////////////////////////////
app.get('/api/json/mail/:acctId', jsonMailRoutes.getMsgIds);
app.get('/api/json/mail/:acctId/:msgId', jsonMailRoutes.getMsg);

app.post('/api/json/mail/:acctId', jsonMailRoutes.postMsg);

app.get('/api/json/log', jsonLogRoutes.getAccessLog);
app.get('/api/json/log/:acctId', jsonLogRoutes.getAccessLogByAcct);

// Start the server ////////////////////////////////////////////////////////////
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
