export type Product = {
    name: string;
    price: number;
    quantity: number;
}

export class ProductNotFoundError extends Error {

    constructor(productName: string) {
        super(`Product '${productName}' does not exist in inventory `);
        this.name = "ProductNotFoundError";
    }

}

export class ProductExistsError extends Error {

    constructor(product: Product) {
        super(`Product '${product.name}' already exists.`);
        this.name = "ProductExistsError";
    }

}

export class NegativePriceError extends Error {

    constructor (price: Number) {
        super(`Price can not be negative. Received ${price}.`);
        this.name = "NegativePriceError";
    }

}

export class NegativeQuantityError extends Error {

    constructor (quantity: Number) {
        super(`Quantity can not be negative. Received ${quantity}.`);
        this.name = "NegativeQuantityError";
    }

}

export class Inventory {

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
