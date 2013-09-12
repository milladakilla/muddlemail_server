var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailMessageSchema = new Schema({

  //The account the message came into. This should be a good shard-key.
  accountId: {
    type: String,
    index: 1,
    required: true
  },

  //AES256-CBC data that is base64 encoded.
  aesCbcData: {
    type: String,
    required: true
  },

  //AES256-CBC Intialization Vector.
  aesCbcIv: {
    type: String,
    required: true
  },

  //RSA encrypted AES256-CBC password.
  aesCbcPassword: {
    type: String,
    required: true
  },

  //!!! This field will expire documents after 45days !!!
  //Server creation date/time stamp.
  createdDate: {
    type: Date,
    default: Date.now,
    index: 1,
    expires: 60 * 60 * 24 * 45,
    required: true
  }
});

exports.MailMessage = mongoose.model('MailMessage', mailMessageSchema);
