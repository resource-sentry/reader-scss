const Constants  = require('./model/constants'),
      ValueTypes = require('./model/value-types');

class NodeMath {
    constructor(variables) {
        this.variables = variables;
    }

    getLatestNode(node) {
        let variable;

        if (node.is(ValueTypes.VARIABLE) === true) {
            variable = this.variables.getVariable(node.content.toString(), false);
            if (variable !== Constants.VARIABLE_UNDETERMINED) {
                // Copy a computation result to the content
                variable.content = variable.value;
            }
            return variable;
        } else if (node.length > 0) {
            return this.getLatestNode(node.first());
        } else {
            return node;
        }
    }

    getValue(tree) {
        let value = null;

        if (tree.contains(ValueTypes.OPERATOR) === true
            && tree.contains(ValueTypes.IDENTIFIER) === false
            && tree.contains(ValueTypes.STRING) === false) {
            value = this.parseFormula(tree);
        }

        return value;
    }

    parseFormula(tree) {
        let currentNode, finalNode;
        let formula = '';
        let i = 0, len = tree.length;
        let dimensions = false;

        for (i; i < len; ++i) {
            currentNode = tree.get(i);
            finalNode = this.getLatestNode(currentNode);

            // Can not resolve variable reference to compute
            if (finalNode === Constants.VARIABLE_UNDETERMINED) {
                return Constants.VARIABLE_UNDETERMINED;
            }

            // Mark all formula as a dimension
            if (currentNode.type === ValueTypes.DIMENSION || finalNode.type === ValueTypes.DIMENSION) {
                dimensions = true;
            }

            formula += finalNode.content;
        }

        return {
            type   : (dimensions === true) ? ValueTypes.DIMENSION : ValueTypes.NUMBER,
            content: new Function('return ' + formula)()
        };
    }
}

module.exports = NodeMath;
