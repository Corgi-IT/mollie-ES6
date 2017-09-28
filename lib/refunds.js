const {assign} = require('lodash');
const denied = require('obj-denied');

const refundFunctions = {
    /**
     * Returns a boolean stating the order is paid or not
     * @returns {Boolean} Order is paid or not
     */
    isPaid() {
        return ['paid', 'paidout'].indexOf(this.status.toLowerCase()) > -1;
    },
    /**
     * Returns a boolean stating the order is partially refunded or not
     * @returns {Boolean} Order is partially refunded or not
     */
    isPartiallyRefunded() {
        return this.amountRemaining && this.amountRemaining > 0;
    },
    /**
     * Returns a boolean stating the order is fully paid out or not
     * @returns {Boolean} Order is fully paid out or not
     */
    isFullyRefunded() {
        return this.amountRefunded === this.amount;
    }
};

/**
 * Creates a new refund
 * @param {String} id The Payments id you'd like to refund
 * @param {Number} amount Optional amount you'd like to refund.
 * If omitted, the full amount will be refunded
 * @returns {Object} New Refund or error, created by Mollie
 */
function* create(id, amount) {
    if (!id) {
        throw {error: 'Not all required parameters are given'};
    }
    const opts = {amount};

    const result = yield this.request(
        'POST',
        `payments/${id}/refunds`,
        opts
    );

    if (result.error) {
        throw result;
    } else {
        readifyRefunds(result);
        return result;
    }
}

/**
 * Get information about a payments specific refund
 * @param {String} paymentId The Payments id
 * @param {String} refundId The Refunds id
 * @returns {Object} Refund info or error, given by Mollie
 */
function* get(paymentId, refundId) {
    if (!paymentId || !refundId) {
        throw {error: 'No paymentId or refundId is given'};
    }

    const result = yield this.request(
        'GET',
        `payments/${paymentId}/refunds/${refundId}`
    );

    if (result.error) {
        throw result;
    } else {
        readifyRefunds(result.payment);
        return result;
    }
}

/**
 * Retrieves a list of Refunds from Mollie for a Payment
 * @param {String} id The Payments id
 * @param {Object} options Options Mollie accepts for Refunds.List
 * @returns {Object} New Payment or error, created by Mollie
 */
function* list(id, options = {}) {
    if (!id) {
        throw {error: 'No id is given'};
    }
    if (!denied(options, 'count') && options.count > 250) {
        throw {error: 'Count larger than 250 is not allowed'};
    }

    const result = yield this.request(
        'GET',
        `payments/${id}/refunds`,
        null,
        options
    );

    if (result.error) {
        throw result;
    } else {
        readifyRefunds(result.data);
        return result;
    }
}

/**
 * Cancels a Refund
 * @param {String} paymentId The Payments id
 * @param {String} refundId The Refunds id
 * @returns {Object} Refund info or error, given by Mollie
 */
function* cancel(paymentId, refundId) {
    if (!paymentId || !refundId) {
        throw {error: 'No paymentId or refundId is given'};
    }

    const result = yield this.request(
        'DELETE',
        `payments/${paymentId}/refunds/${refundId}`
    );

    if (result.error) {
        throw result;
    } else {
        readifyRefunds(result.data);
        return result;
    }
}

function readifyRefunds(refunded) {
    if (refunded.constructor === Object) {
        assign(refunded, refundFunctions);
    } else {
        for (let i = 0; i < refunded.length; i++) {
            assign(refunded[i], refundFunctions);
        }
    }
}

module.exports = {
    create,
    get,
    list,
    cancel
};
