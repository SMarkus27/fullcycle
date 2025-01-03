import {Address} from "../value-object/address";
import {Entity} from "../../@shared/entity/entity.abstract";
import {NotificationError} from "../../@shared/notification/notification.error";
import {CustomerValidatorFactory} from "../factory/customor.validator.factory";

export class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super()
        this._id = id;
        this._name = name;
        this.validate()

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    validate() {
        CustomerValidatorFactory.create().validate(this)
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address
    }

    get name() {
        return this._name
    }

    isActivate(): boolean {
        return this._active;
    }

    get rewardPoints() {
        return this._rewardPoints;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get Address() {
        return this._address
    }


    set Address(address: Address) {
        this._address = address;
    }
}