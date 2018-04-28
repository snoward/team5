const { uploadImage, loadImage } = require('../libs/imageUploader');
const ErrorInfo = require('../models/errorInfo');

module.exports.getImage = (req, res) => {
    const imageId = req.params.id;

    loadImage(imageId)
        .then(image => {
            res.set('Content-Type', image.contentType);
            res.set('Content-Length', image.buffer.length);
            res.status(200).end(image.buffer, 'binary');
        })
        .catch(() =>
            res.status(500).json({ error: new ErrorInfo(500, 'Server error') })
        );
};

module.exports.uploadImage = (req, res) => {
    uploadImage(req.file)
        .then(imageId =>
            res.status(201).json({ imageId })
        )
        .catch((error) =>
            res.status(error.http_code).json({
                error: new ErrorInfo(error.http_code, error.message)
            }));
};
