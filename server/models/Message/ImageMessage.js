const BaseMessage = require('./BaseMessage');

module.exports = class ImageMessage extends BaseMessage {
    constructor({ type, author, date, imageUrl }) {
        super({ type, author, date });
        this.validate(imageUrl, 'string', 'ImageMessage should have imageUrl property as string');
        this.imageUrl = imageUrl;
    }
};
