const TextMessage = require('../TextMessage');
const ImageMessage = require('../ImageMessage');

const SUPPORTED_TYPES = ['image', 'text'];

module.exports = class MessageFactory {
    static async create({ type, author, date, text = null, imageUrl = null }) {
        if (!SUPPORTED_TYPES.includes(type)) {
            throw new TypeError(`Supported types: ${SUPPORTED_TYPES.join(', ')}`);
        }

        if (type === 'text') {
            return await new TextMessage({ type, author, date, text });
        }

        if (type === 'image') {
            return new ImageMessage({ type, author, date, imageUrl });
        }
    }
};
