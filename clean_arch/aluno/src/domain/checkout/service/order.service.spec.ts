import {OrderItem} from "../entity/orderItem";
import {Order} from "../entity/order";
import {OrderService} from "./order.service";
import {Customer} from "../../customer/entity/customer";

describe("Order Service unit tests", () => {

    it("should get total of all orders", () => {
        const item1 = new OrderItem("1", "item 1", 100, "1", 1);
        const item2 = new OrderItem("2", "item 2", 200, "2", 2);

        const order = new Order("1", "1", [item1]);
        const order2 = new Order("2", "1", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(500);
    });

    it("should place an order", () => {

        const customer = new Customer("1", "customer 1");
        const item1 = new OrderItem("1", "item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    });

    it("should add reward points", () => {
        const customer = new Customer("1", "customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20);
    })
});