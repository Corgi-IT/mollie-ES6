import request from './request';

function *list(options) {
    if (options.count && options.count > 250) {
        throw {error: 'Count larger than 250 is not allowed'};
    }

    const result = yield request(
        'GET',
        `issuers`,
        null,
        options
    );

    if (result.error) {
        throw result;
    } else {
        return result;
    }
}

function *get(id) {
    if (!id) {
        throw {error: 'No id is given'};
    }

    const result = yield request(
        'GET',
        `issuers/${id}`
    );

    if (result.error) {
        throw result;
    } else {
        return result;
    }
}

export default {
    get,
    list
};
