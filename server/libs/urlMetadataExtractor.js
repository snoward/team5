const fetch = require('node-fetch');
const metascraper = require('metascraper');

const urlRegExp = new RegExp('(https?:\\/\\/(?:www\\.|(?!www))' +
    '[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]' +
    '\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+' +
    '\\.[^\\s]{2,})');

class urlMetadataExtractor {
    static async extract(targetUrl) {
        try {
            const html = await fetch(targetUrl).then(res => res.text());

            return metascraper({ html, url: targetUrl }).then(result => {
                return result.logo || result.description ? result : null;
            });
        } catch (e) {
            return null;
        }
    }

    static async extractFromText(text) {
        const url = this.getFirstUrl(text);

        return url ? this.extract(url) : null;
    }

    static getFirstUrl(text) {
        const matches = text.match(urlRegExp);
        if (!matches) {
            return null;
        }
        let url = matches[0];
        url = url.replace(/[.,!]$/, '');
        if (url.endsWith(')') &&
            (url.match(/\(/g) || []).length !== (url.match(/\)/g) || []).length) {
            url = url.replace(/\)$/, '');
        }

        return url;
    }
}

module.exports = urlMetadataExtractor;
