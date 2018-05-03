const BaseMessage = require('./BaseMessage');

module.exports = class TextMessage extends BaseMessage {
    constructor({ conversationId, type, author, date, text, metadata }) {
        super({ conversationId, type, author, date });

        this.validate(text, 'string', 'TextMessage should have text property as string');
        this.text = text;
        this.metadata = metadata;
    }
};
