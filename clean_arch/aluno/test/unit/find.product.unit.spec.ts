import {Product} from "../../src/domain/product/entity/product";
import {FindProductUseCase} from "../../src/usecase/product/find/find.product.usecase";

const product = new Product("1", "product 1", 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for find product use case", () => {

    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1"
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: "1",
            name: "product 1",
            price: 100
        })
    });
    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "1121a"
        }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("Product not found");

    });
});