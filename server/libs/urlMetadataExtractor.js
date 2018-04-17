const fetch = require('node-fetch');
const metascraper = require('metascraper');

const urlRegExp = new RegExp('(https?:\\/\\/(?:www\\.|(?!www))' +
    '[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]' +
    '\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+' +
    '\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})');

class urlMetadataExtractor {
    static async extract(targetUrl) {
        try {
            const html = await fetch(targetUrl).then(res => res.text());

            return metascraper({ html, url: targetUrl });
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
