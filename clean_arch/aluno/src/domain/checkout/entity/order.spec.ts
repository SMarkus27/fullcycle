import {OrderItem} from "./orderItem";
import {Order} from "./order";


describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => new Order("", "1", [])).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => new Order("1", "", [])).toThrowError("CustomerId is required");
    });

    it("should throw error when item is empty", () => {
        expect(() => new Order("1", "123", [])).toThrowError("Items is required");

    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "item 2", 200, "p2", 2);
        const order = new Order("1", "item 1", [item]);

        let total = order.total();

        expect(total).toBe(200);

        const order2 = new Order("1", "item 1", [item, item2]);

        total = order2.total();

        expect(total).toBe(600);

    });

    it("should throw error if the item quantity is less or equal zero", () => {
        expect(() => {
            new OrderItem("i1", "item 1", 100, "p1", 0);
        }).toThrowError("Quantity must be greater than 0");


    });
});
