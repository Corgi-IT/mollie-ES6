import payments from './lib/payments';
import methods from './lib/methods';
import issuers from './lib/issuers';

const mollie = {
    payments,
    methods,
    issuers,
    api_key: null
};

export default mollie;
