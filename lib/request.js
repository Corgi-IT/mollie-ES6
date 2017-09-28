const superagent = require('superagent');
const denied = require('obj-denied');

module.exports = function* (method, extension, data, urlParameters) {
    if (!this.key) {
        throw {error: 'There is no API key I can use, please set your key `this.key`'};
    }
    method = method.toLowerCase();

    // Get the base promise
    const request = getMethodPromise(method, extension, urlParameters);

    // Set api key
    request.set('Authorization', `Bearer ${this.key}`);

    // Add data to request
    if (method !== 'get') {
        request.send(data);
    }

    try {
        const result = yield request;
        return result.body;
    } catch (e) {
        if (denied(e, 'response'))
            throw e;
        else
            throw e.response.body;
    }
};

function getMethodPromise(method, extension, urlParameters) {
    const url = `https://api.mollie.nl/v1/${extension}${addURLParams(urlParameters)}`;

    switch (method) {
        case 'get':
            return superagent.get(url);
        case 'post':
            return superagent.post(url);
        case 'delete':
            return superagent.delete(url);
    }
}

function addURLParams(urlParameters = {}) {
    if (Object.keys(urlParameters).length === 0)
        return '';

    let urlParams = '';

    for (let prop in urlParameters) {
        urlParams += `&${prop}=${urlParameters[prop]}`;
    }

    return urlParams.replace('&', '?');
}
