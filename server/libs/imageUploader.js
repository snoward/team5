/* eslint-disable camelcase*/
const cloudinary = require('cloudinary');
const got = require('got');
const uuid = require('uuid/v4');
const config = require('config');

const { cloudName, apiKey, apiSecret } = config.get('imageCdnConfig');

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

module.exports.uploadImage = (file) => {
    const id = uuid();

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            result => {
                if (result.error) {
                    return reject(result.error);
                }

                return resolve(id);
            }, { resource_type: 'image', public_id: id })
            .end(file.buffer);
    });
};

module.exports.loadImage = (id) => {
    const url = cloudinary.url(id);

    const options = {
        method: 'GET',
        encoding: null // ~ binary
    };

    return got(url, options).then(result => {
        return {
            buffer: result.body,
            contentType: result.headers['content-type']
        };
    });
};
