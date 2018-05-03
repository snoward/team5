const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    ownerName: { type: String, required: true },
    contacts: [String]
});

ContactSchema.statics.findOneOrCreate = async (ownerName) => {
    const model = mongoose.model('Contact');
    const contact = await model.findOne({ ownerName });

    return contact || model.create({ ownerName, contacts: [] });
};

ContactSchema.methods.addContact = function (contactName) {
    if (this.contacts.includes(contactName)) {
        return null;
    }
    this.contacts.push(contactName);

    return contactName;
};

mongoose.model('Contact', ContactSchema);
module.exports = mongoose.model('Contact');
