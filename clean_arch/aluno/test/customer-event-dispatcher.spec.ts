import {EventDispatcher} from "../src/domain/@shared/event/event-dispatcher";
import {
    SendEmailWhenCustomerIsCreatedHandler
} from "../src/domain/customer/event/handler/send-email-when-customer-is-created.handler";

import {
    SendLogWhenCustomerIsCreatedHandler
} from "../src/domain/customer/event/handler/send-log-when-customer-is-created.handler";
import {CustomerCreatedEvent} from "../src/domain/customer/event/customer-created.event";
import {Customer} from "../src/domain/customer/entity/customer";
import {Address} from "../src/domain/customer/value-object/address";
import {
    SendEmailWhenCustomerAddressChangeHandler
} from "../src/domain/customer/event/handler/send-email-when-customer-address-change.handler";
import {CustomerChangeAddressEvent} from "../src/domain/customer/event/customer-change-address.event";


describe("Customer events test", () => {

    it("should register customer events handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendLogWhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    });

    it("should unregister an customer event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendLogWhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

    });

    it("should unregister all customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendLogWhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });

    it("should notify all customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendLogWhenCustomerIsCreatedHandler();
        const spyEventHandle = jest.spyOn(eventHandler, "handle");
        const spyEventHandle2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customer = new Customer("1", "Marcus")
        const address = new Address("street 1",1, "000000", "city 1")
        customer.Address = address;

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            street: customer.Address.street,
            number: customer.Address.number,
            zip: customer.Address.zip,
            city: customer.Address.city,

        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandle).toHaveBeenCalled();
        expect(spyEventHandle2).toHaveBeenCalled();


    });

    it("should notify a customer event handlers when customer address change", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendLogWhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendEmailWhenCustomerAddressChangeHandler();

        const spyEventHandle = jest.spyOn(eventHandler, "handle");
        const spyEventHandle2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandle3 = jest.spyOn(eventHandler3, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customer = new Customer("1", "Marcus")
        const address = new Address("street 1",1, "000000", "city 1")
        customer.Address = address;

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            street: customer.Address.street,
            number: customer.Address.number,
            zip: customer.Address.zip,
            city: customer.Address.city,
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandle).toHaveBeenCalled();
        expect(spyEventHandle2).toHaveBeenCalled();

        const newAddress = new Address("street 2",2, "111111", "city 2")
        customer.changeAddress(newAddress);

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: customer.id,
            name: customer.name,
            street: customer.Address.street,
            number: customer.Address.number,
            zip: customer.Address.zip,
            city: customer.Address.city,

        });
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler3);

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandle3).toHaveBeenCalled();



    });
});