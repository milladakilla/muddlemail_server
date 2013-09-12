var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * We are going to keep a lot of logs and make them plublicly avaialbe.  We do not
 * want to rely on gated security to protecty anything, so we may as well make a
 * good effort to share as much as we can so people know they should not rely on
 * gates.
 */
var accessLogSchema = new Schema({

  //Server created date/time stamp.
  reqDate: {
    type: Date,
    default: Date.now,
    index: -1,
    required: true
  },

  //HTTP Method.
  reqHttpMethod: {
    type: String,
    required: true
  },

  //Ip address that made the request.
  reqIp: {
    type: String,
    required: true
  },

  //URL being accessed.
  reqUrl: {
    type: String,
    index: -1,
    required: true
  },

  //All headers in the request.
  reqHeaders: {
    type: {},
    required: true
  }

});

exports.AccessLog = mongoose.model('accessLog', accessLogSchema);
