import { Column, PrimaryGeneratedColumn } from 'typeorm'

export enum CustomerDocumentType {
  CPF = 'CPF',
  RG = 'RG',
}

export class Customer {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    nullable: false,
  })
  public name!: string

  @Column({
    nullable: false,
  })
  public document!: string

  @Column({
    type: 'enum',
    enum: CustomerDocumentType,    
    nullable: false,
  })
  public documentType!: CustomerDocumentType

  @Column({
    nullable: true,
  })
  public phone?: string

  @Column({
    nullable: true,
  })
  public email?: string
}
