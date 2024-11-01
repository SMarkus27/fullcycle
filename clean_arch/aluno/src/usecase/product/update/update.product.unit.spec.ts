import {UpdateProductUseCase} from "./update.product.usecase";
import {ProductFactory} from "../../../domain/product/factory/product.factory";
import {NotificationError} from "../../../domain/@shared/notification/notification.error";


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
        productRepository.update.mockImplementation(() => {
        throw new NotificationError([{context: "product", message: "Name is required!"}])
        });

        input.name = ""
        const useCase = new UpdateProductUseCase(productRepository);

        await expect(   () => {
            return   useCase.execute(input)
        }).rejects.toThrow("product: Name is required!");
        input.name = "product 10";

    });


    it("should not updated a product when price is negative", async () => {
        const productRepository = MockRepository();
        productRepository.update.mockImplementation(() => {
            throw new NotificationError([{context: "product", message: "Price must be greater than zero"}])
        });

        input.price = -50
        const useCase = new UpdateProductUseCase(productRepository);

        await expect( () => {
            return useCase.execute(input)
        }).rejects.toThrow("product: Price must be greater than zero");
        input.price = 50;

    });
});