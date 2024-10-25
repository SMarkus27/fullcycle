import {ProductFactory} from "../../src/domain/product/factory/product.factory";
import {ListProductUseCase} from "../../src/usecase/product/list/list.product.usecase";

const product1 = ProductFactory.create("a", "product 1", 50);
const product2 = ProductFactory.create("a", "product 2", 150);


const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    }
}

describe("Unit Test for list product use case", () => {

    it("should list products", async () => {
        const productRepository = MockRepository();
        const usecase = new ListProductUseCase(productRepository);

        const output = await usecase.execute({});

        expect(output.products.length).toEqual(2);
        expect(output.products[0].id).toEqual(product1.id);
        expect(output.products[0].name).toEqual(product1.name);
        expect(output.products[0].price).toEqual(product1.price);

        expect(output.products[1].id).toEqual(product2.id);
        expect(output.products[1].name).toEqual(product2.name);
        expect(output.products[1].price).toEqual(product2.price);
    });
});