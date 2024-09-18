import {Product} from "../src/domain/entity/product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => new Product("", "Product 1", 100)).toThrowError("Id is required!");
    });
    it("should throw error when name is empty", () => {
        expect(() => new Product("1", "", 100)).toThrowError("Name is required!");
    });

    it("should throw error when price is negative", () => {
        expect(() => new Product("1", "Product 1", -10)).toThrowError("Price must be greater than zero");
    });

    it("should change name", () => {
        const product = new Product("1", "Product 1", 100);
        product.changeName("Product 2");

        expect(product.name).toEqual("Product 2");
    });

    it("should change price", () => {
        const product = new Product("1", "Product 1", 100);
        product.changePrice(150);

        expect(product.price).toEqual(150);
    });
});
