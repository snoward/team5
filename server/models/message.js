module.exports = class Message {
    constructor({ author, date, text }) {
        this.author = author;
        this.date = date || new Date();
        this.text = text;
    }
};
