const request = require('./request');

/**
 * Retrieves a list of issuers from Mollie
 * @param {Object} options Options Mollie accepts for Issuers.List
 * @returns {Object} List of issuers along with some other data
 */
function *list(options) {
    if (options.count && options.count > 250) {
        throw {error: 'Count larger than 250 is not allowed'};
    }

    const result = yield request(
        'GET',
        'issuers',
        null,
        options
    );

    if (result.error) {
        throw result;
    } else {
        return result;
    }
}

/**
 * Get information about an issuer from Mollie by it's id
 * @param {String} id The issuers id
 * @returns {Object} Issuer information or error, given by Mollie
 */
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

module.exports = {
    get,
    list
};
