import {Sequelize} from "sequelize-typescript";
import {CustomerModel} from "../src/infrastructure/customer/repository/sequilize/customer.model";
import {OrderModel} from "../src/infrastructure/order/repository/sequilize/order.model";
import {OrderItemModel} from "../src/infrastructure/order/repository/sequilize/orderItem.model";
import {ProductModel} from "../src/infrastructure/product/repository/sequilize/product.model";
import {CustomerRepository} from "../src/infrastructure/customer/repository/sequilize/customer.repository";
import {Customer} from "../src/domain/customer/entity/customer";
import {Address} from "../src/domain/customer/value-object/address";
import {ProductRepository} from "../src/infrastructure/product/repository/sequilize/product.repository";
import {Product} from "../src/domain/product/entity/product";
import {OrderItem} from "../src/domain/checkout/entity/orderItem";
import {Order} from "../src/domain/checkout/entity/order";
import {OrderRepository} from "../src/infrastructure/order/repository/sequilize/order.repository";

describe("Order Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel,   ProductModel]);
        await sequelize.sync()


    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product("1", "product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)

        const order = new Order("1", "1", [orderItem])

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "1",
                    product_id: "1",
                }
            ]
        })


    });

    it("should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product("1", "product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)

        const order = new Order("1", "1", [orderItem])
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const updatedOrderItem = new OrderItem("1", "product 2", 10, product.id, 10);
        order.changeItems([updatedOrderItem])

        await orderRepository.update(order);
        const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});
        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "1",
                    product_id: "1",
                }
            ]
        });
    });


    it('should find order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product("1", "product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)

        const order = new Order("1", "1", [orderItem])

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderResult = await orderRepository.find(order.id);
        expect(order).toStrictEqual(orderResult)

    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();
        expect(async () => {
            await orderRepository.find("aaaa")
        }).rejects.toThrow("Order not found");
    });


    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product("1", "product 1", 10);
        await productRepository.create(product);
        const orderItem1 = new OrderItem("1", product.name, product.price, product.id, 2)
        const order1 = new Order("1", "1", [orderItem1])

        const orderItem2 = new OrderItem("2", product.name, product.price, product.id, 25)
        const order2 = new Order("2", "1", [orderItem2])

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();
        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);

    });
});