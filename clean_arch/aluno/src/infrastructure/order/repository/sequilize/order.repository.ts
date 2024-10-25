import {Order} from "../../../../domain/checkout/entity/order";
import {OrderModel} from "./order.model";
import {OrderItemModel} from "./orderItem.model";
import {OrderRepositoryInterface} from "../../../../domain/checkout/repository/order-repository.interface";
import {OrderItem} from "../../../../domain/checkout/entity/orderItem";

export class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            items: entity.items.map(item=> ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,

            })),
            total: entity.total(),

        }, {
            include: [{model: OrderItemModel}]
        })
    }
    async update(entity: Order): Promise<void> {

        await OrderModel.update({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item=> ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,

            }))
        },
            {
                where: {id: entity.id},

            }
    )
    };

    async find(id: string): Promise<Order> {
        let orderModel ;
        try {
            orderModel = await OrderModel.findOne({where: {id},include: ["items"], rejectOnEmpty: true});
        }
        catch(err) {
            throw new Error("Order not found")
        }
        const orderItems = orderModel.items.map(item => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            )
        })

        const order = new Order(id, orderModel.id, orderItems);
        return order

    }
    async findAll(): Promise<Order[]> {
        const orderModel = await OrderModel.findAll({include:["items"]});
        const orders = orderModel.map(order => {
            return new Order(order.id, order.customer_id, order.items.map(item => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity)
            }))
        })

        return orders
    }
}