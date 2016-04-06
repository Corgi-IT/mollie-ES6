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

    result.getPaymentUrl = function () {
        return result.links.paymentUrl;
    };

    return result;
}

// function *get(id) {
//
// }
//
// function *list(options) {
//
// }

export default {
    create
    // get,
    // list
};
