import payments from './lib/payments';
import methods from './lib/methods';
import issuers from './lib/issuers';
import refunds from './lib/refunds';

const mollie = {
    payments,
    methods,
    issuers,
    refunds,
    api_key: null
};

export default mollie;
