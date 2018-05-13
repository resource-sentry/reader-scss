const Promise    = require('bluebird'),
      fsNative   = require('fs'),
      gonzales   = require('gonzales-pe'),
      path       = require('path'),
      BaseReader = require('@resource-sentry/utils/lib/base-reader'),
      Logger     = require('@resource-sentry/utils/lib/logger');

const Ast         = require('./ast'),
      Constants   = require('./model/constants'),
      fs          = Promise.promisifyAll(fsNative),
      ValueParser = require('./value-parser');

class ScssReader extends BaseReader {
    constructor(config) {
        super();
        this.logger = Logger(this.constructor.name);
        this.config = config;
    }

    getEntry() {
        return this.config.entry;
    }

    scan() {
        return Promise
            .resolve()
            .then(() => {
                let configPath = path.resolve(process.cwd(), this.getEntry());
                this.logger.verbose(`Loading "${configPath}" config.`);
                return fs.readFileAsync(configPath, 'utf8');
            })
            .then(content => {
                let variable;
                let ast = new Ast();
                let parser = new ValueParser();
                let tree = gonzales.parse(content, {syntax: 'scss'});
                let secondPath = [];

                parser.setValueHandler((category, name, value) => this.addValue(category, name, value));

                tree.forEach('declaration', (child, index, parent) => {
                    if (ast.containsDeep(child, 'variable') === true) {
                        variable = ast.nodeToVariable(child);

                        if (variable.value === Constants.VARIABLE_UNDETERMINED) {
                            secondPath.push(child);
                        } else {
                            parser.parse(variable.name, variable.value);
                        }
                    }
                });

                if (secondPath.length > 0) {
                    this.logger.verbose(`Running second path for ${secondPath.length} variables.`);
                }

                secondPath.forEach(child => {
                    variable = ast.nodeToVariable(child);
                    parser.parse(variable.name, variable.value);
                });

                this.dispatch('dataDidChange');
            });
    }
}

module.exports = ScssReader;
