class Mollie {

    constructor(key) {
        this.key = key;

        this.customers = {};
        this.issuers = {};
        this.methods = {};
        this.payments = {};
        this.refunds = {};

        const customers = require('./lib/customers');
        const issuers = require('./lib/issuers');
        const methods = require('./lib/methods');
        const payments = require('./lib/payments');
        const refunds = require('./lib/refunds');

        for (let key in customers)
            this.customers[key] = customers[key].bind(this)
        for (let key in issuers)
            this.issuers[key] = issuers[key].bind(this);
        for (let key in methods)
            this.methods[key] = methods[key].bind(this);
        for (let key in payments)
            this.payments[key] = payments[key].bind(this);
        for (let key in refunds)
            this.refunds[key] = refunds[key].bind(this);

        this.request = require('./lib/request').bind(this);
    }

    * test() {
        try {
            const result = yield this.payments.list();

            return !!result.data;
        } catch (e) {
            if (e.error && e.error.message && e.error.message === 'Unauthorized request')
                return false;

            throw e;
        }
    }
}

module.exports = Mollie;
