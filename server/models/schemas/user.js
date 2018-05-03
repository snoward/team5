const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true }
});

UserSchema.statics.ensureExists = async (username) => {
    let user;
    try {
        user = await mongoose.model('User').findOne({ username });
    } catch (ex) {
        console.error(ex);
    }

    return user;
};

UserSchema.statics.findOneOrCreate = async (username) => {
    const model = mongoose.model('User');
    const user = await model.findOne({ username });

    return user || model.create({ username });
};

module.exports = mongoose.model('User', UserSchema, 'users');
