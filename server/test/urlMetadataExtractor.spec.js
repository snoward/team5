/* eslint-env mocha */

const assert = require('assert');

const extractor = require('../libs/urlMetadataExtractor');

const yandexExpected = {
    description: 'Найдётся всё',
    title: 'Яндекс',
    url: 'https://www.yandex.ru/',
    'og:site_name': 'Яндекс'
};

const githubExpected = {
    url: 'https://github.com/',
    description: 'GitHub brings together the world’s largest community ' +
        'of developers to discover, share, and build better software',
    title: 'Build software better, together',
    'og:site_name': 'GitHub'
};

describe('extract by url', function () {

    it('correct url', async function () {
        const actual = await extractor.extract(yandexExpected.url);
        assertMetadataEquality(actual, yandexExpected);
    });

    it('incorrect url', async function () {
        const actual = await extractor.extract('yandex.ru');
        assert.equal(actual, null);
    });
});

describe('extract from the text', function () {
    it('simple url', async function () {
        const actual = await extractor.extractFromText(yandexExpected.url);
        assertMetadataEquality(actual, yandexExpected);
    });

    it('text without links', async function () {
        const textWithoutLinks = 'Stack Overflow - Where Developers Learn, Share, & Build Careers';
        const actual = await extractor.extractFromText(textWithoutLinks);
        assert.equal(actual, null);
    });

    it('text with multiple links', async function () {
        const multipleLinks = `yandex: ${yandexExpected.url} github: ${githubExpected.url}`;
        const actual = await extractor.extractFromText(multipleLinks);
        assertMetadataEquality(actual, yandexExpected);
    });

    it('text with guthub url. description length option', async function () {
        const text = `The world's leading software development platform ${githubExpected.url}`;
        const options = { descriptionLength: githubExpected.description.length };
        const actual = await extractor.extractFromText(text, options);
        assertMetadataEquality(actual, githubExpected);
    }).timeout(3000);
});

function assertMetadataEquality(actual, expected) {
    assert.equal(actual.description, expected.description);
    assert.equal(actual.title, expected.title);
    assert.equal(actual.url, expected.url);
    assert.equal(actual['os:site_name'], expected['os:site_name']);
}
