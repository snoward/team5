const ErrorInfo = require('../models/errorInfo');
// const { makeCall } = require('../libs/caller');
const Call = require('../models/schemas/call');

module.exports.registerCall = async (req, res) => {
    return res.status(423).json({
        error: new ErrorInfo(423, 'Сервис временно недоступен')
    });

    /* const dispatchTime = new Date(req.body.dispatchTime);
    const callTime = new Date(req.body.callTime);
    const timeout = callTime - dispatchTime;
    const phoneNumber = req.body.phoneNumber;
    const username = req.user.username;

    if (timeout <= 0) {
        return res.status(400).json({
            error: new ErrorInfo(400, 'Нельзя установить будильник в прошлом')
        });
    }

    if (await Call.count({ username, isCanceled: false })) {
        return res.status(400).json({
            error: new ErrorInfo(400, 'Нельзя установить больше одного будильника')
        });
    }

    const createdCall = await Call.create({ username, callTime });


    setTimeout(async () => {
        const call = await Call.findById(createdCall._id);
        Call.findByIdAndRemove(call._id).exec();

        if (!call.isCanceled) {
            makeCall(phoneNumber);
        }

    }, timeout);

    res.status(201).json(createdCall); */
};

module.exports.getCalls = async (req, res) => {
    const calls = await Call.find({ username: req.user.username, isCanceled: false });
    res.status(200).json(calls);
};

module.exports.cancelCall = async (req, res) => {
    const _id = req.body._id;
    await Call.findByIdAndUpdate(_id, { isCanceled: true }).exec();
    res.sendStatus(200);
};
