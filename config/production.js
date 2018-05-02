module.exports = {
    githubCliendId: process.env.GITHUB_CLIENT_ID,
    gitHubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    expressSessionSecret: process.env.EXPRESS_SESSION_SECRET,
    baseUrl: process.env.BASE_URL,
    dbConfig: {
        token: process.env.HRUDB_TOKEN,
        dbUrl: 'https://hrudb.herokuapp.com/storage/',
        requestTimeout: 1000,
        retryCount: 3
    },
    imageCdnConfig: {
        cloudName: process.env.IMAGE_CDN_CLOUD_NAME,
        apiKey: process.env.IMAGE_CDN_API_KEY,
        apiSecret: process.env.IMAGE_CDN_API_SECRET
    },
    mongoDb: {
        uri: 'mongodb+srv://LOGIN:PASSWORD@messengerproductioncluster-ej5fo.mongodb.net/messenger',
        login: process.env.MONGODB_LOGIN,
        password: process.env.MONGODB_PASSWORD
    }
};
