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
    }
};
