const Categories = require('@resource-sentry/utils/lib/categories');

const ScssReader = require('../src/index');

describe('Text', () => {

    let categories;

    beforeAll(() => {
        let reader = new ScssReader({entry: './test/data/style-text.scss'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('uses Text category', () => {
        expect(categories[Categories.TEXT]).toBeDefined();
    });

    it('extracts the string', () => {
        expect(categories[Categories.TEXT]).toContainEqual({name: 'alertClass', value: 'error'});
    });

    it('extract very first node', () => {
        expect(categories[Categories.TEXT]).toContainEqual({name: 'buttonConfig', value: 'save'});
    });

});
