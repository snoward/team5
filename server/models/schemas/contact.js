const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;
// const UserSchema = require('../schemas/user').schema;

const ContactSchema = new Schema({
    ownerName: { type: String, required: true },
    contacts: [String]
});

// ContactSchema.statics.findByName = (name) => {
//     return this.findOne({ name });
// }

mongoose.model('Contact', ContactSchema);
module.exports = mongoose.model('Contact');
