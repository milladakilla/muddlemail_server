var accessDb = require('../db/models/access_log');


exports.getAccessLog = function(req, res) {

  var LOG_LIMIT_MAX = 5000;

  //Sort criteria.
  var sortCriteria = {
    reqDate: -1
  };

  //Limit the rows returned.
  var logLimit = 100;
  if (req.query.limit) {
    logLimit = req.query.limit;
  }

  if (logLimit > LOG_LIMIT_MAX) {
    logLimit = LOG_LIMIT_MAX;
  }

  //List of fields the user wants.
  var fields = 'reqDate reqHttpMethod reqIp reqUrl reqHeaders';
  if (req.query.fields) {
    fields = req.query.fields;
  }

  var query = accessDb.AccessLog
    .find({}, fields)
    .sort(sortCriteria)
    .limit(logLimit)
    .exec(function(err, foundLogs) {
      if (err) {
        console.log('TODO: json getAccessLog ' + JSON.stringify(err));
        res.status(500);
        res.json({
          'error': 'Could not find your logs.  Unkown error.'
        });
        return;
      }
      res.json(foundLogs);
    });
};

/**
 *
 */
exports.getAccessLogByAcct = function(req, res) {

  var LOG_LIMIT_MAX = 5000;

  //Sort criteria.
  var sortCriteria = {
    reqDate: -1
  };

  //Limit the rows returned.
  var logLimit = 100;
  if (req.query.limit) {
    logLimit = req.query.limit;
  }

  if (logLimit > LOG_LIMIT_MAX) {
    logLimit = LOG_LIMIT_MAX;
  }

  //List of fields the user wants.
  var fields = 'reqDate reqHttpMethod reqIp reqUrl reqHeaders';
  if (req.query.fields) {
    fields = req.query.fields;
  }

  var query = accessDb.AccessLog
    .find({
      reqUrl: new RegExp('^/api/.*/mail/' + req.params.acctId + '.*')
    }, fields)
    .sort(sortCriteria)
    .limit(logLimit)
    .exec(function(err, foundLogs) {
      if (err) {
        console.log('TODO: json getAccessLog ' + JSON.stringify(err));
        res.status(500);
        res.json({
          'error': 'Could not find your logs.  Unkown error.'
        });
        return;
      }
      res.json(foundLogs);
    });
};
