import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../../src/infrastructure/product/repository/sequilize/product.model";
import {ProductRepository} from "../../src/infrastructure/product/repository/sequilize/product.repository";
import {ProductFactory} from "../../src/domain/product/factory/product.factory";
import {ListProductUseCase} from "../../src/usecase/product/list/list.product.usecase";

describe('Integration Test for list product use case', () => {

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


    it("should find a list of products", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository)

        const product1 = ProductFactory.create("a", "product 1", 100);
        const product2 = ProductFactory.create("b", "product 2", 150);

        // @ts-ignore
        await productRepository.create(product1);
        // @ts-ignore
        await productRepository.create(product2);

        const output = await usecase.execute({});

        expect(output.products.length).toEqual(2);
        expect(output.products[0].id).toEqual(product1.id);
        expect(output.products[0].name).toEqual(product1.name);
        expect(output.products[0].price).toEqual(product1.price);

        expect(output.products[1].id).toEqual(product2.id);
        expect(output.products[1].name).toEqual(product2.name);
        expect(output.products[1].price).toEqual(product2.price);

    });
});