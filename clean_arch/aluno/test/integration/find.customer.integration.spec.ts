import {Sequelize} from "sequelize-typescript";
import {CustomerModel} from "../../src/infrastructure/customer/repository/sequilize/customer.model";
import {CustomerRepository} from "../../src/infrastructure/customer/repository/sequilize/customer.repository";
import {Customer} from "../../src/domain/customer/entity/customer";
import {Address} from "../../src/domain/customer/value-object/address";
import {FindCustomerUseCase} from "../../src/usecase/customer/find/find.customer.usecase";

describe('Test find customer use case', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("1", "customer 1");
        const address = new Address("street 1",1, "000000", "city 1")

        customer.changeAddress(address);

       await customerRepository.create(customer);

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
});