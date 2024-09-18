import {Sequelize} from "sequelize-typescript";
import {Customer} from "../src/domain/entity/customer";
import {CustomerModel} from "../src/infrastructure/db/sequelize/model/customer.model";
import {CustomerRepository} from "../src/infrastructure/repository/customer";
import {Address} from "../src/domain/entity/address";


describe("Customer Repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync()


    });
    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")
        customer.Address = address;

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: 1}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActivate(),
            rewardPoints: customer.rewardPoints,
        });
    });
    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")
        customer.changeAddress(address);


        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: 1}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActivate(),
            rewardPoints: customer.rewardPoints,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")
        customer.Address = address;

        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerResult);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository()

        expect(async () => {
            await customerRepository.find("aaaa")
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository()
        const customer1 = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")
        customer1.Address = address;
        customer1.addRewardPoints(10);
        customer1.activate();

        const customer2 = new Customer("2", "customer 2");
        const address2 = new Address("street 2",2, "000000", "city 2")
        customer2.Address = address2;
        customer2.addRewardPoints(20);
        customer2.activate();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);

    });

});