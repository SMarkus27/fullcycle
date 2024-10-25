import {CustomerFactory} from "../src/domain/customer/factory/customer.factory";
import {Address} from "../src/domain/customer/value-object/address";

describe('Customer factory unit test', () => {

    it('Should create a customer ', () => {
        let  customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Rua 2", 25, "00021-632", "ABC");
        let  customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);



    });
});