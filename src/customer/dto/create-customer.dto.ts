import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'
import { CustomerDocumentType } from '../entities/customer.entity'

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    public name!: string

    @IsString()
    @IsNotEmpty()
    public document!: string

    @IsEnum(CustomerDocumentType)
    @IsNotEmpty()
    public documentType!: CustomerDocumentType

    @IsPhoneNumber('BR')
    public phone?: string
    
    @IsEmail()
    public email?: string
}
