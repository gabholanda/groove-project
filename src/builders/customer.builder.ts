import { Customer } from "src/models/customer.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerBuilder {
    newCustomer(costumerKey: number, customerName: string): Customer {
        return { id: '', customer_name: customerName, costumer_key: costumerKey, signature: '' };
    }

    newEmptyCustomer(): Customer {
        return { id: '', customer_name: '', costumer_key: -1, signature: '' };
    }

    fullCustomer(id: string, customerKey: number, customerName: string, signature: string): Customer {
        return { id: id, customer_name: customerName, costumer_key: customerKey, signature: signature };
    }
}