import {EventHandlerInterface} from "../../shared/event-handler.interface";
import {CustomerChangeAddressEvent} from "../customer-change-address.event";

export class SendEmailWhenCustomerAddressChangeHandler implements EventHandlerInterface<CustomerChangeAddressEvent>{
    handle(event: CustomerChangeAddressEvent): void {
        const data = event.eventData;

        console.log(`Endereço do cliente: ${data.id}, ${data.name}, alterado para: ${data.street}, ${data.number}, ${data.zip}, ${data.city} `);

    }

}