import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { Customer } from 'src/models/customer.model';
import { CustomerBuilder } from 'src/builders/customer.builder';
import { GrooveAuthService } from '../groove-auth/groove-auth.service';

@Injectable()
export class CustomerService {
    constructor(
        private readonly customerBuilder: CustomerBuilder,
        private readonly grooveAuthService: GrooveAuthService,
        private readonly redisService: RedisService
    ) { }

    async create(customerKey: number, customerName: string): Promise<Customer> {
        if (!customerKey || !customerName) {
            throw new BadRequestException('You need costumer_key and customer_name attributes');
        }
        const customer: Customer = this.customerBuilder.newCustomer(customerKey, customerName);
        await this.grooveAuthService.login().toPromise()
            .then(async (res) => {
                await this.grooveAuthService.sign(customer.costumer_key, customer.customer_name, res.token)
                    .then(res => customer.signature = res.signature)
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error));
        return this.redisService.set(customer);
    }

    async findById(id: string): Promise<Customer> {
        if (!id) {
            throw new BadRequestException('You need id attribute');
        }
        let customer: Customer = this.customerBuilder.newEmptyCustomer();
        await this.redisService.get(id)
            .then(data => {
                const unserializedData = JSON.parse(data);
                customer = this.customerBuilder
                    .fullCustomer(
                        id,
                        unserializedData.costumer_key,
                        unserializedData.customer_name,
                        unserializedData.signature);
            })
            .catch(error => {
                console.log(error);
            });

        return customer;
    }

    async update(id: string, customerKey: number, customerName: string): Promise<Customer> {
        let customer: Customer;
        await this.findById(id)
            .then((data: Customer) => {
                if (!data) {
                    throw new NotFoundException("Customer not found");
                }
                customer = this.customerBuilder
                    .fullCustomer(
                        id,
                        data.costumer_key,
                        data.customer_name,
                        data.signature);
            })
            .catch(error => {
                console.log(error);
            });
        customer.costumer_key = customerKey;
        customer.customer_name = customerName;
        await this.grooveAuthService.login().toPromise()
            .then(async (res) => {
                await this.grooveAuthService.sign(customer.costumer_key, customer.customer_name, res.token)
                    .then(res => customer.signature = res.signature)
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error));
        return this.redisService.set(customer);
    }

}
