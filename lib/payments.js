import request from './request';
import {assign} from 'lodash';

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
        result.getPaymentUrl = function () {
            return result.links.paymentUrl;
        };
        return result;
    }
}

function *get(id) {
    if (!id) {
        throw {error: 'No id is given'};
    }

    const result = yield request(
        'GET',
        'payments'
    );

    if (result.error) {
        throw result;
    } else {
        result.isPaid = function () {
            return ['paid', 'paidout'].indexOf(result.status.toLowerCase()) > -1;
        };
        return result;
    }
}
//
// function *list(options) {
//
// }

export default {
    create,
    get
    // list
};
