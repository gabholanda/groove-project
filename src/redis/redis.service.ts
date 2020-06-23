import * as Redis from 'ioredis';
import { Customer } from 'src/models/customer.model';
import { uuid } from 'uuidv4';

const redis = new Redis(6379, '0.0.0.0');

const redisMethods =
{
    set: (customer: Customer): Customer => {
        if (customer.id) {
            redis.set(`customer:${customer.id}`, JSON.stringify(customer));
        } else {
            const customerUuid: string = uuid();
            customer.id = customerUuid;
            redis.set(`customer:${customerUuid}`, JSON.stringify(customer));
        }

        return customer;
    },
    get: async (id: string): Promise<any> => {
        const response = await redis.get(`customer:${id}`)
        return response;
    }
}

export default redisMethods;