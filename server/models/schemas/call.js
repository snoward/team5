const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;

const CallSchema = new Schema({
    username: { type: String },
    callTime: { type: Date },
    isCanceled: { type: Boolean, default: false }
});

mongoose.model('Call', CallSchema);
module.exports = mongoose.model('Call');
