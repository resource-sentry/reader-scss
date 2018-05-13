const Categories = require('@resource-sentry/utils/lib/categories');

const ScssReader = require('../src/index');

describe('Dimension', () => {

    let categories;

    beforeAll(() => {
        let reader = new ScssReader({entry: './test/data/style-dimension.scss'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('uses Dimension category', () => {
        expect(categories[Categories.DIMENSION]).toBeDefined();
    });

    it('extracts pixel value', () => {
        expect(categories[Categories.DIMENSION]).toContainEqual({name: 'breakpoint', value: 768});
    });

    it('converts percentile to float number', () => {
        expect(categories[Categories.DIMENSION]).toContainEqual({name: 'firstValue', value: 0.625});
    });

    it('extracts default value', () => {
        expect(categories[Categories.DIMENSION]).toContainEqual({name: 'secondValue', value: 24});
    });
});
