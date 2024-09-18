import {Customer} from "./domain/entity/customer";
import {Address} from "./domain/entity/address";
import {OrderItem} from "./domain/entity/orderItem";
import {Order} from "./domain/entity/order";

let customer = new Customer("123", "Marcus");
const address = new Address("Rua 2", 25, "00021-632", "ABC");
// customer.Address = address;

//
// const item1 = new OrderItem("1", "iten 1", 10);
// const item2 = new OrderItem("2", "iten 2", 15);

// const order = new Order("1", "1", [item1, item2]);


