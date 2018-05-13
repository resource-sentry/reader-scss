const clone = require('clone');

const Constants = require('./model/constants');

class Variables {
    constructor() {
        this.scope = {};
    }

    getVariable(reference, pointer = true) {
        let value = this.scope[reference];
        if (value === undefined) {
            value = Constants.VARIABLE_UNDETERMINED;
        } else {
            value = (pointer === true) ? value : clone(value);
        }
        return value;
    }

    setVariable(reference, value) {
        this.scope[reference] = value;
    }
}

module.exports = Variables;
