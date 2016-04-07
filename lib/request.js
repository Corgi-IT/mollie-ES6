import superagent from 'superagent';
import mollie from '../app';

export default function *(method, extension, data) {
    if (!mollie.api_key) {
        throw {error: 'There is no API key I can use, please set your key `mollie.api_key`'};
    }

    method = method.toLowerCase();

    // Get the base promise
    const request = getMethodPromise(method, extension);
    // Set api_key
    request.set('Authorization', `Bearer ${mollie.api_key}`);
    // Send data to mollie
    if (method !== 'get') {
        request.send(data);
    }

    try {
        const result = yield request;
        return result.body;
    } catch (e) {
        throw e.response.res.body;
    }
}

function getMethodPromise(method, extension) {
    const mollie_base_url = 'https://api.mollie.nl/v1';
    switch (method) {
        case 'get':
            return superagent.get(`${mollie_base_url}/${extension}`);
        case 'post':
            return superagent.post(`${mollie_base_url}/${extension}`);
        case 'delete':
            return superagent.delete(`${mollie_base_url}/${extension}`);
    }
}
