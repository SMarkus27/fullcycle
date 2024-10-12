import {RepositoryInterface} from "./repository-interface";
import {Customer} from "../../customer/entity/customer";

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {
}