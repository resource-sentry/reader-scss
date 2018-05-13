const Categories = require('@resource-sentry/utils/lib/categories');

const ScssReader = require('../src/index');

describe('Color', () => {

    let categories;

    beforeAll(() => {
        let reader = new ScssReader({entry: './test/data/style-color.scss'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('uses Color category', () => {
        expect(categories[Categories.COLOR]).toBeDefined();
    });

    it('extracts HEX color', () => {
        expect(categories[Categories.COLOR]).toContainEqual({name: 'primaryColor', value: 'eeffcc'});
    });

    it('converts basic web color', () => {
        expect(categories[Categories.COLOR]).toContainEqual({name: 'message-color', value: '0000FF'});
    });

    it('converts extended web color', () => {
        expect(categories[Categories.COLOR]).toContainEqual({name: 'headerColor', value: 'D2691E'});
    });
});
