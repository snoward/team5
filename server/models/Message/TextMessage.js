const BaseMessage = require('./BaseMessage');
const metadataExtractor = require('../../libs/urlMetadataExtractor');

module.exports = class TextMessage extends BaseMessage {
    constructor({ type, author, date, text }) {
        super({ type, author, date });

        this.validate(text, 'string', 'TextMessage should have text property as string');
        this.text = text;

        return new Promise(async (resolve) => {
            this.metadata = await metadataExtractor.extractFromText(text);
            resolve(this);
        });
    }
};
