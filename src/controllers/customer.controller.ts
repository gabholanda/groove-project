import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { Customer } from 'src/models/customer.model';
import { CustomerService } from 'src/services/customer/customer.service';

@Controller('customer')
export class CustomerController {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(private readonly customerService: CustomerService) { }
    @Post()
    create(
        @Body('costumer_key') customerKey: number,
        @Body('customer_name') customerName: string
    ): Promise<Customer> {
        return this.customerService.create(customerKey, customerName);
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Customer> {
        return this.customerService.findById(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body('costumer_key') customerKey: number,
        @Body('customer_name') customerName: string): Promise<Customer> {
        return this.customerService.update(id, customerKey, customerName);
    }
}
