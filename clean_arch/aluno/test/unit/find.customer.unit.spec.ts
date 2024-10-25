import {Customer} from "../../src/domain/customer/entity/customer";
import {Address} from "../../src/domain/customer/value-object/address";
import {FindCustomerUseCase} from "../../src/usecase/customer/find/find.customer.usecase";

const customer = new Customer("1", "customer 1");
const address = new Address("street 1",1, "000000", "city 1")
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}


describe('Unit Test find customer use case', () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

       const input = {
           id: "1"
       }

       const output = {
           id: "1",
           name: "customer 1",
           address: {
               street: "street 1",
               city: "city 1",
               number: 1,
               zip: "000000"
           }
       };

       const result = await usecase.execute(input);

       expect(result).toEqual(output)
    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "14512"
        };

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("Customer not found")

    });
});