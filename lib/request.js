const superagent = require('superagent');

module.exports = function* (method, extension, data, url_parameters) {
    const mollie = require('../app');

    if (!mollie.api_key) {
        throw {error: 'There is no API key I can use, please set your key `mollie.api_key`'};
    }
    method = method.toLowerCase();

    // Get the base promise
    const request = getMethodPromise(method, extension, url_parameters);

    // Set api_key
    request.set('Authorization', `Bearer ${mollie.api_key}`);

    // Add data to request
    if (method !== 'get') {
        request.send(data);
    }

    try {
        const result = yield request;
        return result.body;
    } catch (e) {
        throw e.response.body;
    }
};

function getMethodPromise(method, extension, url_parameters) {
    const url = `https://api.mollie.nl/v1/${extension}${addURLParams(url_parameters)}`;

    switch (method) {
    case 'get':
        return superagent.get(url);
    case 'post':
        return superagent.post(url);
    case 'delete':
        return superagent.delete(url);
    }
}

function addURLParams(url_parameters = {}) {
    if (Object.keys(url_parameters).length === 0)
        return '';

    let urlParams = '';

    for (let prop in url_parameters) {
        urlParams += `&${prop}=${url_parameters[prop]}`;
    }

    return urlParams.replace('&', '?');
}
