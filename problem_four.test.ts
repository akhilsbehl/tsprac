const {
    Inventory,
    ProductNotFoundError,
    ProductExistsError,
    NegativeQuantityError,
} = require('./problem_four');

describe('Inventory', () => {
    let inventory;

    beforeEach(() => {
        inventory = new Inventory([]);
        inventory.addProduct({name: "Widget", price: 25.00, quantity: 100});
        inventory.addProduct({name: "Gadget", price: 75.00, quantity: 200});
    });

    test('calculate total value', () => {
        inventory.removeProduct("Widget");
        inventory.updateProductPrice("Gadget", 50);
        inventory.updateProductQuantity("Gadget", 150);

        let totalValue = inventory.calculateTotalValue();
        expect(totalValue).toBe(7500);
    });

    test('list products', () => {
        let products = inventory.listProducts();
        expect(products).toEqual(expect.arrayContaining([{
            name: "Gadget",
            price: 75.00,
            quantity: 200,
        }, {
            name: "Widget",
            price: 25.00,
            quantity: 100,
        }]));
    });

    test('remove nonexistent product', () => {
        expect(() => inventory
            .removeProduct("Nonexistent Product"))
            .toThrow(ProductNotFoundError);
    });

    test('update quantity of nonexistent product', () => {
        expect(() => inventory
            .updateProductQuantity("Nonexistent Product", 10))
            .toThrow(ProductNotFoundError);
    });

    test('update price of nonexistent product', () => {
        expect(() => inventory
            .updateProductPrice("Nonexistent Product", 100))
            .toThrow(ProductNotFoundError);
    });

    test('add existing product', () => {
        expect(() => inventory
            .addProduct({name: "Gadget", price: 50.00, quantity: 150}))
            .toThrow(ProductExistsError);
    });

    test('add product with negative quantity', () => {
        expect(() => inventory.addProduct({
            name: "New Product",
            price: 100.00,
            quantity: -5,
        })).toThrow(NegativeQuantityError);
    });
});
