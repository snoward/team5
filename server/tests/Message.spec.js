/* eslint-env mocha */
/* eslint-disable no-new */

const assert = require('assert');

const BaseMessage = require('../models/Message/BaseMessage');
const TextMessage = require('../models/Message/TextMessage');
const ImageMessage = require('../models/Message/ImageMessage');

describe('BaseMessage tests', function () {

    it('should throw error with no type property', async function () {
        assert.throws(() => new BaseMessage({ author: 'stub' }), TypeError);
    });

    it('should throw error with not string type property', async function () {
        assert.throws(() => new BaseMessage({ type: 1, author: 'stub' }), TypeError);
    });

    it('should throw error with no author property', async function () {
        assert.throws(() => new BaseMessage({ type: 'stub' }), TypeError);
    });

    it('should throw error with not string author property', async function () {
        assert.throws(() => new BaseMessage({ type: 'stub', author: 1 }), TypeError);
    });

    it('shouldn`t throw error when all properties provided', async function () {
        assert.doesNotThrow(() => new BaseMessage({ type: 'stub', author: 'stub' }));
    });
});

describe('TextMessage tests', function () {

    it('should throw error with no text property', async function () {
        assert.throws(() => new TextMessage({ type: 'stub', author: 'stub' }), TypeError);
    });

    it('should throw error with not string text property', async function () {
        assert.throws(() => new TextMessage({ type: 'stub', author: 'stub', text: 1 }), TypeError);
    });

    it('shouldn`t throw error when all properties provided', async function () {
        assert.doesNotThrow(() => new TextMessage({ type: 'stub', author: 'stub', text: 'stub' }));
    });

});

describe('ImageMessage tests', function () {

    it('should throw error with no imageUrl property', async function () {
        assert.throws(() => new ImageMessage({ type: 'stub', author: 'stub' }), TypeError);
    });

    it('should throw error with not string imageUrl property', async function () {
        assert.throws(() =>
            new ImageMessage({ type: 'stub', author: 'stub', imageUrl: 1 }), TypeError);
    });

    it('shouldn`t throw error when all properties provided', async function () {
        assert.doesNotThrow(() =>
            new ImageMessage({ type: 'stub', author: 'stub', imageUrl: 'stub' }));
    });

});
