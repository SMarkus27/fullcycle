import {EventInterface} from "../../@shared/event/event.interface";

export class CustomerChangeAddressEvent implements EventInterface{
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any){
        this.eventData = eventData;
        this.dataTimeOccurred = new Date();
    }
}