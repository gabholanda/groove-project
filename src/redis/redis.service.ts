import * as Redis from 'ioredis';
import { Customer } from 'src/models/customer.model';
import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RedisService {
    redis: any;

    constructor() {
        this.redis = new Redis(6379, '0.0.0.0');
    }

    set(customer: Customer): Customer {
        if (customer.id) {
            this.redis.set(`customer:${customer.id}`, JSON.stringify(customer));
        } else {
            const customerUuid: string = uuid();
            customer.id = customerUuid;
            this.redis.set(`customer:${customerUuid}`, JSON.stringify(customer));
        }

        return customer;
    }
    async get(id: string): Promise<any> {
        const response = await this.redis.get(`customer:${id}`)
        return response;
    }
}
