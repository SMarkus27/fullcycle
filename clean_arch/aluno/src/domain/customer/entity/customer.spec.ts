import {Customer} from "./customer";
import {Address} from "../value-object/address";


describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => new Customer("", "Marcus")).toThrowError("customer: Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => new Customer("1", "")).toThrowError("customer: Name is required");
    })

    it("should throw error when name and id are empty", () => {
        expect(() => new Customer("", "")).toThrowError("customer: Id is required, customer: Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("1", "Marcus");
        customer.changeName("John Doe");

        expect(customer.name).toBe("John Doe");

    })

    it("should activate customer", () => {
        const customer = new Customer("1", "Marcus");
        const address = new Address("Rua 2", 25, "00021-632", "ABC");
        customer.Address = address

        customer.activate()

        expect(customer.isActivate()).toBe(true)

    });
    it("should deactivate customer", () => {
        const customer = new Customer("1", "Marcus");
        customer.deactivate()

        expect(customer.isActivate()).toBe(false)

    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Marcus");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");

    })

});