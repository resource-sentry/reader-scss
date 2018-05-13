const Categories = require('@resource-sentry/utils/lib/categories');

const ScssReader = require('../src/index');

describe('Variable', () => {

    let categories;

    beforeAll(() => {
        let reader = new ScssReader({entry: './test/data/style-variable.scss'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('inherits dimension type', () => {
        expect(categories[Categories.DIMENSION]).toHaveLength(4);
    });

    it('references another variable', () => {
        expect(categories[Categories.DIMENSION]).toContainEqual({name: 'padding-xs', value: 4});
    });

    it('references via pre-operation', () => {
        expect(categories[Categories.DIMENSION]).toContainEqual({name: 'padding-s', value: 8});
    });

    it('references via post-operation', () => {
        expect(categories[Categories.DIMENSION]).toContainEqual({name: 'padding-m', value: 12});
    });

});
