import {ProductInterface} from "./product.interface";
import {Entity} from "../../@shared/entity/entity.abstract";
import {NotificationError} from "../../@shared/notification/notification.error";
import {ProductValidatorFactory} from "../factory/product.validator.factory";


export class Product  extends Entity implements ProductInterface{
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super()
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();

    }

    changePrice(price: number) {
        this._price = price;
        this.validate();

    }

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    validate(): boolean {
        ProductValidatorFactory.create().validate(this)
        return true;
    }
}