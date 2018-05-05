const mongoose = require('../../libs/mongoose');
const Schema = mongoose.Schema;

const MetadataSchema = new Schema({
    title: String,
    description: String,
    image: String
});

mongoose.model('Metadata', MetadataSchema);
module.exports = mongoose.model('Metadata');
