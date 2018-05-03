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
    if (req.params.username === req.user.username) {
        return res.status(400).json({
            error: new ErrorInfo(400, 'Can`t add yourself to contacts')
        });
    }

    const user = await User.ensureExists(req.params.username);
    if (!user) {
        return res.status(404).json({
            error: new ErrorInfo(404, `User ${req.params.username} not found`) });
    }

    let contactInfo = await Contact.findOneOrCreate(req.user.username);
    const addedContact = contactInfo.addContact(req.params.username);
    if (!addedContact) {
        return res.status(400).json({
            error: new ErrorInfo(400, `Contact ${req.params.username} already exist`)
        });
    }
    await contactInfo.save();

    res.status(201).json(addedContact);
};
