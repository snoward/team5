const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;

const EmojiSchema = new Schema({
    username: { type: String, unique: true },
    titles: [String]
});

mongoose.model('Emoji', EmojiSchema);
module.exports = mongoose.model('Emoji');
