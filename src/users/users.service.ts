import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import bcrypt from 'bcrypt'
import { UpdatePasswordDto } from './dto/update-password.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {    
    createUserDto.password = await this.hashPassword(createUserDto.password)
    return await this.userRepository.save(createUserDto)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto)
  }

  async updatePassword(id: number, passwordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } })
    let passwordEquals = await bcrypt.compare(passwordDto.oldPassword, user.password)

    if (passwordEquals)
      throw new Error('Old password don\'t match')

    passwordEquals = await bcrypt.compare(passwordDto.newPassword, user.password)
    
    if (passwordEquals) 
      throw new Error('Password is the same as the current one')
    

    user.password = await this.hashPassword(passwordDto.newPassword)
    return await this.userRepository.update(id, user)
  }

  async remove(id: number) {
    return await this.userRepository.delete(id)
  }

  async find(id: number) {
    return await this.userRepository.find({ where: { id } })
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(name: string, email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: [{ name }, {email}] })
  }

  async findByEmail(email: string) {
    return await this.userRepository.find({ where: { email } })
  }
  
  async findByName(name: string) {
    return await this.userRepository.find({ where: { name } })
  }
  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  }
}
