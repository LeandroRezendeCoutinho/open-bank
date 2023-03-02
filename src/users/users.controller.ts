import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.usersService.find(+id)
  }

  @Get(':name/:email')
  async getByNameAndEmail(
    @Param('name') name: string, 
    @Param('email') email: string) {
    
      if (!name && !email) {
        throw new Error('At least one query parameter is required (name or email)') 
    }

    if (name) {
      return await this.usersService.findByName(name)
    } else {
      return await this.usersService.findByEmail(email)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Put(':id/update-password')
  async updatePassword(@Param('id') id: string, @Body() passwordDto: UpdatePasswordDto) {
    return await this.usersService.updatePassword(+id, passwordDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
