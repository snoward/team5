const twilio = require('twilio');
const config = require('config');

const { accountSid, authToken, callerNumber, twiml } = config.get('caller');

const client = twilio(accountSid, authToken);

module.exports.makeCall = (phoneNumber) => {
    client.calls
        .create({ url: twiml, from: callerNumber, to: `${phoneNumber}` })
        .then(() => console.info('Звонок: ', phoneNumber))
        .done();
};
