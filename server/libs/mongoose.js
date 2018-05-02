const mongoose = require('mongoose');
const config = require('config');

function getConnectionString() {
    const mongoDbConfig = config.get('mongoDb');
    const login = mongoDbConfig.login;
    const password = mongoDbConfig.password;
    let uri = mongoDbConfig.uri;
    uri = uri.replace('LOGIN', login);
    uri = uri.replace('PASSWORD', password);

    return uri;
}

const connectionString = getConnectionString();
mongoose.connect(connectionString).catch(e => console.error(e));

mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;
