const ScssReader = require('../src/index');

describe('Ignore', () => {

    let categories;

    beforeAll(() => {
        let reader = new ScssReader({entry: './test/data/style-ignore.scss'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('ignores all variables', () => {
        expect(categories).toHaveLength(0);
    });

});
