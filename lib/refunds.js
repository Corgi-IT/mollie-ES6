import request from './request';
import {assign} from 'lodash';

const refund_functions = {
    isPaid() {
        return ['paid', 'paidout'].indexOf(this.status.toLowerCase()) > -1;
    },
    isPartiallyRefunded() {
        return this.amountRemaining && this.amountRemaining > 0;
    },
    isFullyRefunded() {
        return this.amountRefunded === this.amount;
    }
};

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
        readifyRefunds(result);
        return result;
    }
}

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
