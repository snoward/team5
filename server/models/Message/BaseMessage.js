module.exports = class BaseMessage {
    constructor({ conversationId, type, author, date }) {
        this.validate(type, 'string', 'Message should have type property as string');
        this.validate(author, 'string', 'Message should have author property as string');

        this.conversationId = conversationId;
        this.type = type;
        this.author = author;
        this.date = date || new Date();
    }

    validate(object, objectType, errorMessage) {
        if (!object || typeof object !== objectType) {
            throw new TypeError(errorMessage);
        }
    }
};
