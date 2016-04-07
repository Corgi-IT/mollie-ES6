import request from './request';
import {assign} from 'lodash';

const payment_functions = {
    getPaymentUrl() {
        return this.links.paymentUrl;
    },
    isPaid() {
        return ['paid', 'paidout'].indexOf(this.status.toLowerCase()) > -1;
    }
};

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
//
// function *list(options) {
//
// }

function readifyPayments(payments) {
    if (payments.constructor === Object) {
        assign(payments, payment_functions);
    } else {
        for (let i = 0; i < payments.length; i++) {
            assign(payments[i], payment_functions);
        }
    }

}

export default {
    create,
    get
    // list
};
