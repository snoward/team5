// Пусть это тут будет, чтобы локально тестить
// Для now сделал отдельный app на гитхабе
module.exports = {
    githubCliendId: 'ddd0e9e63ab10a7e4b51',
    gitHubClientSecret: '1421931def70a02d97ff16a31fe5219f237cb535',
    expressSessionSecret: 'The coolest messenger',
    baseUrl: 'http://localhost:3000',
    dbConfig: {
        token: '***',
        dbUrl: 'https://hrudb.herokuapp.com/storage/',
        requestTimeout: 1000,
        retryCount: 5
    },
    imageCdnConfig: {
        cloudName: '***',
        apiKey: '***',
        apiSecret: '***'
    },
    mongoDb: {
        uri: 'mongodb+srv://LOGIN:PASSWORD@messengerproductioncluster-ej5fo.mongodb.net/messenger',
        login: '***',
        password: '***'
    },
    caller: {
        accountSid: '***',
        authToken: '***',
        callerNumber: '***',
        twiml: '***'
    }
};
