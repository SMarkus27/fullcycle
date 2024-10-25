import {CustomerFactory} from "../../../domain/customer/factory/customer.factory";
import {Address} from "../../../domain/customer/value-object/address";
import {ListCustomerUseCase} from "./listCustomerUseCase";


const customer1 = CustomerFactory.createWithAddress(
    "John Doe",
    new Address(
        "street 1",
        123,
        "000000",
        "city 1"
    )
);

const customer2 = CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address(
        "street 2",
        223,
        "000111",
        "city 2"
    )
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    }
}

describe("Unit test for FindAll customer use case", () => {
    it("should list customers", async () => {
        const customerRepository = MockRepository();

        const usecase = new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute({});

        expect(output.customers.length).toEqual(2);
        expect(output.customers[0].id).toEqual(customer1.id);
        expect(output.customers[0].name).toEqual(customer1.name);
        expect(output.customers[0].address.street).toEqual(customer1.Address.street);

        expect(output.customers[1].id).toEqual(customer2.id);
        expect(output.customers[1].name).toEqual(customer2.name);
        expect(output.customers[1].address.street).toEqual(customer2.Address.street);


    });
});