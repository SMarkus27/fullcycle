import {CustomerFactory} from "../../src/domain/customer/factory/customer.factory";
import {Address} from "../../src/domain/customer/value-object/address";
import {UpdateCustomerUseCase} from "../../src/usecase/customer/update/update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address(
        "street 1",
        123,
        "000000",
        "city 1"
    )
    );

const input = {
    id: customer.id,
    name: "Johnny",
    address: {
        street: "street 2",
        number: 111,
        zip: "000011",
        city: "city 2",
    }
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit Test for customer update use case", () => {

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);

    });
});