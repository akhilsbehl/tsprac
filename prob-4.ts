type Product = {
    name: string;
    price: number;
    quantity: number;
}

class ProductNotFoundError extends Error {

    constructor(productName: string) {
        super(`Product '${productName}' does not exist in inventory `);
        this.name = "ProductNotFoundError";
    }

}

class ProductExistsError extends Error {

    constructor(product: Product) {
        super(`Product '${product.name}' already exists.`);
        this.name = "ProductExistsError";
    }

}

class NegativePriceError extends Error {

    constructor (price: Number) {
        super(`Price can not be negative. Received ${price}.`);
        this.name = "NegativePriceError";
    }

}

class NegativeQuantityError extends Error {

    constructor (quantity: Number) {
        super(`Quantity can not be negative. Received ${quantity}.`);
        this.name = "NegativeQuantityError";
    }

}

class Inventory {

    inventory: Product[];

    constructor(startingStock: Product[]) {
        this.inventory = startingStock;
    };

    addProduct(newProduct: Product): void {
        if (this.inventory.some(p => p.name === newProduct.name)) {
            throw new ProductExistsError(newProduct);
        } else {

            if (newProduct.price < 0) {
                throw new NegativePriceError(newProduct.price);
            }

            if (newProduct.quantity < 0) {
                throw new NegativeQuantityError(newProduct.quantity);
            }

            this.inventory.push(newProduct);
        }
    };

    removeProduct(productName: string): void {
        const i = this.inventory.map(p => p.name).indexOf(productName);
        if (i !== -1) {
            this.inventory.splice(i, 1);
        } else {
            throw new ProductNotFoundError(productName);
        }
    };

    updateProductPrice(productName: string, newPrice: number): void {
        if (newPrice < 0) throw new NegativePriceError(newPrice);

        const i = this.inventory.map(p => p.name).indexOf(productName);
        if (i !== -1) {
            this.inventory[i].price = newPrice;
        } else {
            throw new ProductNotFoundError(productName);
        }

    };

    updateProductQuantity(productName: string, newQuantity: number): void {
        if (newQuantity < 0) throw new NegativeQuantityError(newQuantity);

        const i = this.inventory.map(p => p.name).indexOf(productName)
        if (i !== -1) {
            this.inventory[i].quantity = newQuantity;
        } else {
            throw new ProductNotFoundError(productName);
        }

    };

    calculateTotalValue(): number {
        let total = 0;
        for (let p of this.inventory) {
            total += p.price * p.quantity;
        }
        return total;
    };

    listProducts(): Product[] {
        const sortedProducts = this.inventory.sort(
            (p1, p2) => (p1.price * p1.quantity) - (p2.price * p2.quantity)
        )
        return sortedProducts;
    };
}

let inventory = new Inventory([]);
inventory.addProduct({name: "Widget", price: 25.00, quantity: 100});
inventory.addProduct({name: "Gadget", price: 75.00, quantity: 200});

inventory.removeProduct("Widget");

inventory.updateProductPrice("Gadget", 50);

inventory.updateProductQuantity("Gadget", 150);

let totalValue = inventory.calculateTotalValue();
console.log(totalValue); // Should output 7500 (50*150)

let products = inventory.listProducts();
console.log(products); // Should output [{name: "Gadget", price: 50.00, quantity: 150}]

try {
    inventory.removeProduct("Nonexistent Product");
} catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    inventory.updateProductQuantity("Gadget", -10);
} catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    inventory.updateProductPrice("Nonexistent Product", 100);
} catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    inventory.updateProductQuantity("Nonexistent Product", 10);
} catch (e) {
    if (e instanceof Error) {
        console.log(e.message);
    }
}

try {
    inventory.addProduct({name: "Gadget", price: 50.00, quantity: 150});
} catch (e) {
    if (e instanceof ProductExistsError) {
        console.log(e.message); // Should output: Product 'Gadget' already exists. Perhaps use updateProductQuantity?
    }
}

try {
    inventory.addProduct({name: "New Product", price: 100.00, quantity: -5});
} catch (e) {
    if (e instanceof NegativeQuantityError) {
        console.log(e.message); // Should output: Product quantity cannot be negative.
    }
}

try {
    inventory.removeProduct("Nonexistent Product");
} catch (e) {
    if (e instanceof ProductNotFoundError) {
        console.log(e.message); // Should output: Product 'Nonexistent Product' does not exist in inventory.
    }
}

try {
    inventory.updateProductQuantity("Nonexistent Product", 10);
} catch (e) {
    if (e instanceof ProductNotFoundError) {
        console.log(e.message); // Should output: Product 'Nonexistent Product' does not exist in inventory.
    }
}

try {
    inventory.updateProductPrice("Nonexistent Product", 100);
} catch (e) {
    if (e instanceof ProductNotFoundError) {
        console.log(e.message); // Should output: Product 'Nonexistent Product' does not exist in inventory.
    }
}
