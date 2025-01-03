import {v4 as uuid} from 'uuid';
import {OrderFactory} from "./order.factory";
describe('Order factory unit test', () => {

    it("should create an order", () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [{
                id: uuid(),
                name: "Item 1",
                productId: uuid(),
                quantity: 1,
                price: 10,
            }
            ]
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(order.customerId);
        expect(order.items.length).toBe(1);

    });


});