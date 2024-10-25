import {CreateProductUseCase} from "./create.product.usecase";

const input = {
    type: "a",
    name: "product1",
    price: 100
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test create product use case", () => {

    it("should create a product type a", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);


        const output = await usecase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });

    });

    it("should create a product type b", async () => {
        const productRepository = MockRepository()
        const usecase = new CreateProductUseCase(productRepository);

        input.type = "b";

        const output = await usecase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price * 2
        });
        input.type = "a";

    });

    it("should throw an error when pass wrong product type", async () => {
    const productRepository =  MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    input.type = "c"

    await expect( async () => {
        await usecase.execute(input);
    }).rejects.toThrow("Product type not supported")

    input.type = "a";
});

    it("should throw an error when name is missing", async () => {
        const productRepository =  MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrow("Name is required!");
        input.name = "product1";

    });

    it("should throw an error when price is negative", async () => {
        const productRepository =  MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.price = -10;

        await expect(async () => {
            await usecase.execute(input)
        }).rejects.toThrow("Price must be greater than zero");
    });

})

