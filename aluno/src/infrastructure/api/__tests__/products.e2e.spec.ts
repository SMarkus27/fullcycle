import {app, sequelize} from "../express/express";
import request from "supertest";
import {ProductModel} from "../../product/repository/sequilize/product.model";

describe("E2E test for products", () => {

    beforeEach(async () => {
        await sequelize.addModels([ProductModel]);
        await sequelize.sync({force: true});

    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "product 1",
                price: 55
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("product 1");
        expect(response.body.price).toEqual(55);


    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "product 1",
            });
        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response1 = await request(app)
            .post("/products")
            .send({
                type: "a",
                name: "product 1",
                price: 55
            });

        const response2 = await request(app)
            .post("/products")
            .send({
                type: "b",
                name: "product 2",
                price: 5
            });

        const listResponse = await request(app).get("/products").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product = listResponse.body.products[0];
        expect(product.name).toEqual("product 1");
        expect(product.price).toBe(55);

        const product1 = listResponse.body.products[1];
        expect(product1.name).toEqual("product 2");
        expect(product1.price).toBe(10);

    });

});