import request from './request';
import {assign} from 'lodash';

const method_functions = {
    getMinAmount() {
        return this.amount.minimum;
    },
    getMaxAmount() {
        return this.amount.maximum;
    },
    getImage() {
        return this.image.normal;
    },
    getBiggerImage() {
        return this.image.bigger;
    }
};

function *list(options) {
    if (options.count && options.count > 250) {
        throw {error: 'Count larger than 250 is not allowed'};
    }

    const result = yield request(
        'GET',
        `methods`,
        null,
        options
    );

    if (result.error) {
        throw result;
    } else {
        readifyMethods(result.data);
        return result;
    }
}

function *get(id) {
    if (!id) {
        throw {error: 'No id is given'};
    }

    const result = yield request(
        'GET',
        `methods/${id}`
    );

    if (result.error) {
        throw result;
    } else {
        readifyMethods(result);
        return result;
    }
}

function readifyMethods(method) {
    if (method.constructor === Object) {
        assign(method, method_functions);
    } else {
        for (let i = 0; i < method.length; i++) {
            assign(method[i], method_functions);
        }
    }
}

export default {
    get,
    list
};
