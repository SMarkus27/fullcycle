import {CustomerRepositoryInterface} from "../../../domain/@shared/repository/customer-repository.interface";
import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";
import {Customer} from "../../../domain/customer/entity/customer";

export class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface


    constructor (customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute (input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}


class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto {
        return {
            customers: customer.map(customer => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city
                }
            })),
        }
    }
}