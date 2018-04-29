/* eslint-env mocha */

const assert = require('assert');

const MessageFactory = require('../models/Message/MessageFactory/MessageFactory');
const TextMessage = require('../models/Message/TextMessage');
const ImageMessage = require('../models/Message/ImageMessage');

describe('MessageFactory tests', function () {

    it('should throw error when incorrect type', async function () {
        try {
            await MessageFactory.create({ type: 'stub' });
        } catch (e) {
            return assert.ok(true);
        }
        assert.fail();
    });

    it('should create TextMessage', async function () {
        const message = await MessageFactory.create({
            type: 'text', text: 'stub', author: 'stub'
        });
        if (message instanceof TextMessage) {
            assert.ok(true);
        } else {
            assert.fail();
        }
    });

    it('should create ImageMessage', async function () {
        const message = await MessageFactory.create({
            type: 'image', author: 'stub', imageUrl: 'stub'
        });
        if (message instanceof ImageMessage) {
            assert.ok(true);
        } else {
            assert.fail();
        }
    });
});
