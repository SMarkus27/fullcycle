import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../../../infrastructure/product/repository/sequilize/product.model";
import {ProductRepository} from "../../../infrastructure/product/repository/sequilize/product.repository";
import {FindProductUseCase} from "./find.product.usecase";
import {Product} from "../../../domain/product/entity/product";

describe('Integration Test for product find use case', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);

        const product = new Product("1", "product 1", 100);

        await productRepository.create(product);

        const input = {
            id: "1"
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});