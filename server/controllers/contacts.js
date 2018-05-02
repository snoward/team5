const ErrorInfo = require('../models/errorInfo');
const Contact = require('../models/schemas/contact');
const User = require('../models/schemas/user');

module.exports.contacts = async (req, res) => {
    let contactsInfo;
    try {
        contactsInfo = await Contact.findOne({ ownerName: req.user.username });
    } catch (ex) {
        console.error(ex);
    }
    res.json(contactsInfo ? contactsInfo.contacts : []);
};

module.exports.add = async (req, res) => {
    const user = await User.ensureExists(req.params.username);
    if (!user) {
        return res.status(404).json({
            error: new ErrorInfo(404, `User ${req.params.username} not found`) });
    }

    let contactInfo = await Contact.findOne({ ownerName: req.user.username });
    if (!contactInfo) {
        contactInfo = await Contact.create({
            ownerName: req.user.username,
            contacts: []
        });
    }

    if (contactInfo.contacts.includes(req.params.username)) {
        return res.status(400).json({
            error: new ErrorInfo(400, `Contact ${req.params.username} already exist`)
        });
    }

    contactInfo.contacts.push(req.params.username);
    await contactInfo.save();

    res.status(201).json(contactInfo.contacts);
};
