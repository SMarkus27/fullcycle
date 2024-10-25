import {UpdateProductUseCase} from "./update.product.usecase";
import {ProductFactory} from "../../../domain/product/factory/product.factory";


const product = ProductFactory.create("a", "product 1", 100);

const input = {
    id: product.id,
    name: "product 10",
    price: 50
}


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe("Unit Test for update product use case", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const output = await useCase.execute(input);
        expect(output).toEqual(input)

    });


    it("should not updated a product when name is missing", async () => {
        const productRepository = MockRepository();
        input.name = ""

        const useCase = new UpdateProductUseCase(productRepository);

        await expect(async () => {
            await useCase.execute(input)
        }).rejects.toThrow("Name is required!");
        input.name = "product 10";

    });


    it("should not updated a product when price is negative", async () => {
        const productRepository = MockRepository();
        input.price = -50

        const useCase = new UpdateProductUseCase(productRepository);

        await expect(async () => {
            await useCase.execute(input)
        }).rejects.toThrow("Price must be greater than zero");
        input.price = 50;

    });
});