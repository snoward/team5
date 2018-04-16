const metascraper = require('metascraper');
const got = require('got');
const urlRegExp = new RegExp('(https?:\\/\\/(?:www\\.|(?!www))' +
    '[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]' +
    '\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+' +
    '\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})');

class urlMetadataExtractor {
    static async extract(targetUrl) {
        try {
            const { body: html, url } = await got(targetUrl);

            return await metascraper({ html, url });
        } catch (e) {
            return null;
        }
    }

    static async extractFromText(text) {
        const matches = text.match(urlRegExp);
        const url = matches ? matches[0] : null;
        if (!url) {
            return null;
        }

        return this.extract(url);
    }
}

module.exports = urlMetadataExtractor;
