import request from './request';
import {assign} from 'lodash';

const refund_functions = {
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
function *create(id, amount) {
    if (!id) {
        throw {error: 'Not all required parameters are given'};
    }
    const opts = {amount};

    const result = yield request(
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
 * @param {String} payment_id The Payments id
 * @param {String} refund_id The Refunds id
 * @returns {Object} Refund info or error, given by Mollie
 */
function *get(payment_id, refund_id) {
    if (!payment_id || !refund_id) {
        throw {error: 'No payment_id or refund_id is given'};
    }

    const result = yield request(
        'GET',
        `payments/${payment_id}/refunds/${refund_id}`
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
function *list(id, options) {
    if (!id) {
        throw {error: 'No id is given'};
    }
    if (options && options.count && options.count > 250) {
        throw {error: 'Count larger than 250 is not allowed'};
    }

    const result = yield request(
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
 * @param {String} payment_id The Payments id
 * @param {String} refund_id The Refunds id
 * @returns {Object} Refund info or error, given by Mollie
 */
function *cancel(payment_id, refund_id) {
    if (!payment_id || !refund_id) {
        throw {error: 'No payment_id or refund_id is given'};
    }

    const result = yield request(
        'DELETE',
        `payments/${payment_id}/refunds/${refund_id}`
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
        assign(refunded, refund_functions);
    } else {
        for (let i = 0; i < refunded.length; i++) {
            assign(refunded[i], refund_functions);
        }
    }
}

export default {
    create,
    get,
    list,
    cancel
};
