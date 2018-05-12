const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    title: { type: String, required: true },
    users: { type: [String], required: true },
    isPrivate: { type: Boolean, required: false, default: false }
}, { timestamps: true });

mongoose.model('Conversation', ConversationSchema);
module.exports = mongoose.model('Conversation');
