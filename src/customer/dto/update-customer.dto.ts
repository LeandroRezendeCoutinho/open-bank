import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { CreateCustomerDto } from './create-customer.dto'

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
    @IsNumber()
    @IsNotEmpty()
    public id: number
}
