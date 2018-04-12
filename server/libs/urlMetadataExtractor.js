const urlMetadata = require('url-metadata');
const urlRegExp = new RegExp('(https?:\\/\\/(?:www\\.|(?!www))' +
    '[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]' +
    '\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]' +
    '\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})');

class urlMetadataExtractor {
    static async extract(url, options = null) {
        if (!options) {
            options = {

            };
        }

        return urlMetadata(url, options)
            .catch(() => null);
    }

    static async extractFromText(text, options = null) {
        const url = this.getFirstUrl(text);
        if (!url) {
            return null;
        }

        return this.extract(url, options);
    }

    static getFirstUrl(text) {
        const matches = text.match(urlRegExp);

        return matches ? matches[0] : null;
    }
}

module.exports = urlMetadataExtractor;
