const Categories = require('@resource-sentry/utils/lib/categories');

const ScssReader = require('../src/index');

describe('Formula', () => {

    let categories;

    beforeAll(() => {
        let reader = new ScssReader({entry: './test/data/style-formula.scss'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('uses Dimension category', () => {
        expect(categories[Categories.DIMENSION]).toBeDefined();
    });

    it('uses Value category', () => {
        expect(categories[Categories.VALUE]).toBeDefined();
    });

    it('computes simple value operation', () => {
        expect(categories[Categories.VALUE]).toContainEqual({name: 'computeDiff', value: 100});
    });

    it('computes extra styled formula', () => {
        expect(categories[Categories.VALUE]).toContainEqual({name: 'fancyDiff', value: 400});
    });

    it('preserves dimension', () => {
        expect(categories[Categories.DIMENSION]).toContainEqual({name: 'fontDiff', value: 14 / 16});
    });
});
