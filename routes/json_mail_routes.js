var messageDb = require('../db/models/mail_message');

/**
 *
 */
exports.getMsgIds = function(req, res) {


  var whereClause = {
    accountId: req.params.acctId
  };

  var fields = 'createdDate _id';

  messageDb.MailMessage.find(whereClause, fields, function(err, foundMessages) {
    if (err) {
      console.log('TODO: json getMsgIds ' + JSON.stringify(err));
      res.status(500);
      res.json({
        'error': 'Could not find your message ids.  Unkown error.'
      });
      return;
    }

    res.json(foundMessages);
  });

};

/**
 *
 */
exports.getMsg = function(req, res) {

  var whereClause = {
    accountId: req.params.acctId,
    _id: req.params.msgId
  };

  messageDb.MailMessage.findOne(whereClause, function(err, foundMessage) {
    if (err) {
      console.log('TODO: json getMsg. ' + JSON.stringify(err));
      res.status(500);
      res.json({
        'error': 'Could not find your message.  Unkown error.'
      });
      return;
    }

    if (foundMessage === null) {
      res.status(404);
      res.json({
        'error': 'Could not find message ' + req.params.msgId + ' under account ' + req.params.acctId + '.'
      });
      return;
    }

    res.json(foundMessage);
  });
};

/**
 *
 */
exports.postMsg = function(req, res) {

  var message = new messageDb.MailMessage({
    'accountId': req.params.acctId,
    'aesCbcData': req.body.aesCbcData,
    'aesCbcIv': req.body.aesCbcIv,
    'aesCbcPassword': req.body.aesCbcPassword
  });

  message.save(function(err) {
    if (err) {
      console.log('TODO: json postMsg error. ' + JSON.stringify(err));
      res.status(500);
      res.json({
        'error': 'Could not create your new message.'
      });
      return;
    }

    res.json({
      'success': 'TODO: server signed verification.'
    });
  });
};
