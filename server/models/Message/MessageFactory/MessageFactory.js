const TextMessage = require('../TextMessage');
const ImageMessage = require('../ImageMessage');
const metadataExtractor = require('../../../libs/urlMetadataExtractor');

const SUPPORTED_TYPES = ['image', 'text'];

module.exports = class MessageFactory {
    static async create({ type, author, date, text = null, imageUrl = null }) {
        if (!SUPPORTED_TYPES.includes(type)) {
            throw new TypeError(`Supported types: ${SUPPORTED_TYPES.join(', ')}`);
        }

        if (type === 'text') {
            const metadata = await metadataExtractor.extractFromText(text);

            return await new TextMessage({ type, author, date, text, metadata });
        }

        if (type === 'image') {
            return new ImageMessage({ type, author, date, imageUrl });
        }
    }
};
