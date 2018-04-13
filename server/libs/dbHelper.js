const got = require('got');
const querystring = require('querystring');
const config = require('config');

const { token, dbUrl, requestTimeout, retryCount } = config.get('dbConfig');

class DBHelper {

    static async get(key) {
        return DBHelper._get(dbUrl + key);
    }

    static async getAll(key, params = null) {
        const url = `${dbUrl}${key}/all?` + querystring.stringify(params);

        return DBHelper._get(url);
    }

    static _get(url) {
        const options = DBHelper._makeOptions('GET');

        return DBHelper.request(url, options)
            .then(res => JSON.parse(res.body));
    }

    static async put(key, value) {
        const options = DBHelper._makeOptions('PUT', value);

        return DBHelper.request(dbUrl + key, options);
    }

    static async post(key, value) {
        const options = DBHelper._makeOptions('POST', value);

        return DBHelper.request(dbUrl + key, options);
    }

    static async delete(key) {
        const options = DBHelper._makeOptions('DELETE');

        return DBHelper.request(dbUrl + key, options);
    }

    static async request(url, options) {
        for (let i = 0; i < retryCount; i++) {
            try {
                return await got(url, options);
            } catch (e) {
                console.info(`Failed sending request to ${url}. Status message: ${e.message}`);
                continue;
            }
        }
        throw new Error();
    }

    static _makeOptions(method, body = null) {
        return {
            method,
            headers: {
                'Authorization': token,
                'Content-Type': 'plain/text'
            },
            timeout: requestTimeout,
            body,
            reties: retryCount
        };
    }
}

module.exports = DBHelper;
