const request = require('./request');
const {assign} = require('lodash');

const payment_functions = {
    /**
     * Returns the paymentUrl you redirect the user to, so they can pay the order
     * @returns {String} The paymentUrl
     */
    getPaymentUrl() {
        return this.links.paymentUrl;
    },
    /**
     * Returns a boolean stating the order is paid or not
     * @returns {Boolean} Order is paid or not
     */
    isPaid() {
        return ['paid', 'paidout'].indexOf(this.status.toLowerCase()) > -1;
    }
};

/**
 * Creates a new payment
 * @param {Number} amount The amount to be paid
 * @param {String} description The description for the payment
 * @param {String} redirectUrl The URL Mollie should redirect the user to when done (canceled, paid, etc.)
 * @param {Object} options Options Mollie accepts for Payment.Create
 * @returns {Object} New Payment or error, created by Mollie
 */
function *create(amount, description, redirectUrl, options) {
    if (!amount || !description || !redirectUrl) {
        throw {error: 'Not all required parameters are given'};
    }

    const opts = assign({
        amount,
        description,
        redirectUrl
    }, options);

    const result = yield request(
        'POST',
        'payments',
        opts
    );

    if (result.error) {
        throw result;
    } else {
        readifyPayments(result);
        return result;
    }
}

/**
 * Get information about a payment from Mollie by it's id
 * @param {String} id The payments id
 * @returns {Object} Payment information or error, given by Mollie
 */
function *get(id) {
    if (!id) {
        throw {error: 'No id is given'};
    }

    const result = yield request(
        'GET',
        `payments/${id}`
    );

    if (result.error) {
        throw result;
    } else {
        readifyPayments(result);
        return result;
    }
}

/**
 * Retrieves a list of payments from Mollie
 * @param {Object} options Options Mollie accepts for Payment.List
 * @returns {Object} List of payments along with some other data
 */
function *list(options) {
    if (options && options.count && options.count > 250) {
        throw {error: 'Count larger than 250 is not allowed'};
    }

    const result = yield request(
        'GET',
        `payments`,
        null,
        options
    );

    if (result.error) {
        throw result;
    } else {
        readifyPayments(result.data);
        return result;
    }
}

function readifyPayments(payments) {
    if (payments.constructor === Object) {
        assign(payments, payment_functions);
    } else {
        for (let i = 0; i < payments.length; i++) {
            assign(payments[i], payment_functions);
        }
    }
}

module.exports = {
    create,
    get,
    list
};
