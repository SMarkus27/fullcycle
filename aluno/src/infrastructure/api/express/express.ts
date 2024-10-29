import express, {Express} from "express";
import {Sequelize} from "sequelize-typescript";
import {CustomerModel} from "../../customer/repository/sequilize/customer.model";
import {customerRouter} from "../routes/customer";
import {productRouter} from "../routes/products";

export const app: Express = express();
app.use(express.json());
app.use("/customers", customerRouter);
app.use("/products", productRouter);


export let sequelize: Sequelize;

const setupDb = async () => {
  sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
  });
  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();

};

setupDb();