import {app, sequelize} from "../express/express";
import request from "supertest";

describe("E2E test for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true});

    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Joan",
                address: {
                    street: "street 1",
                    city: "city 1",
                    number: 10,
                    zip: "00000000"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toEqual("Joan");
        expect(response.body.address.street).toEqual("street 1");
        expect(response.body.address.number).toEqual(10);
        expect(response.body.address.zip).toEqual("00000000");


    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "Joan",
            });
        expect(response.status).toBe(500);
    });

    it("should list all customer", async () => {
        const response1 = await request(app)
            .post("/customers")
            .send({
                name: "John",
                address: {
                    street: "street 1",
                    city: "city 1",
                    number: 10,
                    zip: "00000000"
                }
            });

        const response2 = await request(app)
            .post("/customers")
            .send({
                name: "Jane",
                address: {
                    street: "street 2",
                    city: "city 2",
                    number: 102,
                    zip: "00000111"
                }
            });

        const listResponse = await request(app).get("/customers").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer = listResponse.body.customers[0];
        expect(customer.name).toEqual("John");
        expect(customer.address.street).toBe("street 1");

        const customer1 = listResponse.body.customers[1];
        expect(customer1.name).toEqual("Jane");
        expect(customer1.address.street).toBe("street 2");

    });

});