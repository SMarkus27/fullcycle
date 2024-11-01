import {Product} from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => new Product("", "Product 1", 100)).toThrowError("product: Id is required!");
    });
    it("should throw error when name is empty", () => {
        expect(() => new Product("1", "", 100)).toThrowError("product: Name is required!");
    });

    it("should throw error when price is negative", () => {
        expect(() => new Product("1", "Product 1", -10)).toThrowError("product: Price must be greater than zero");
    });

    it("should throw error when price is negative and name is missing", () => {
        expect(() => new Product("1", "", -10)).toThrowError("product: Name is required!, product: Price must be greater than zero");
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
