import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../../src/infrastructure/product/repository/sequilize/product.model";
import {ProductRepository} from "../../src/infrastructure/product/repository/sequilize/product.repository";
import {ProductFactory} from "../../src/domain/product/factory/product.factory";
import {UpdateProductUseCase} from "../../src/usecase/product/update/update.product.usecase";

describe("Integration Test for update product use case", () => {

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

    it('should update a product', async () => {
        const productRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const product = ProductFactory.create("a", "product 1", 200);
        // @ts-ignore
        await productRepository.create(product);
        const input = {
            id: product.id,
            name: "product 2",
            price: 220
        }
        const output = await usecase.execute(input);
        expect(output).toEqual(input);


    });

});