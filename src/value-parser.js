const chalk      = require('chalk'),
      Categories = require('@resource-sentry/utils/lib/categories'),
      Logger     = require('@resource-sentry/utils/lib/logger');

const Constants  = require('./model/constants'),
      ValueTypes = require('./model/value-types');

class ValueParser {
    constructor() {
        this.logger = Logger(this.constructor.name);
        this.valueHandler = null;
    }

    addValue(name, value, category) {
        this.logger.verbose(`Register Value, name: "${chalk.blue(name)}", data: ${value}, category: ${category}`);
        this.valueHandler(name, value, category);
    }

    parse(name, valueData) {
        switch (valueData.type) {
            case ValueTypes.DIMENSION:
            case ValueTypes.PERCENTAGE:
                this.addValue(name, valueData.value, Categories.DIMENSION);
                break;
            case ValueTypes.NUMBER:
                this.addValue(name, valueData.value, Categories.VALUE);
                break;
            case ValueTypes.STRING:
                this.addValue(name, valueData.value.replace(Constants.REG_QUOTES, ''), Categories.TEXT);
                break;
            case ValueTypes.COLOR:
                this.addValue(name, valueData.value, Categories.COLOR);
                break;
        }
    }

    setValueHandler(handler) {
        this.valueHandler = handler;
    }
}

module.exports = ValueParser;
