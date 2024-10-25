import * as stream from "node:stream";
import {CreateCustomerUseCase} from "../../src/usecase/customer/create/create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "street 1 ",
        number: 123,
        zip: "000000",
        city: "city 1",
    }
};


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe("Unit Test create customer use case",   () => {

    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await createCustomerUseCase.execute(input);

        expect(output).toEqual( {
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            },
        });
    });

    it('should thrown an error when name is missing', async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = ""

        await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Name is required");


    });

    it('should thrown an error when street is missing', async () => {
        const customerRepository = MockRepository();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

        input.address.street = ""

        await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Street is required");


    });

});