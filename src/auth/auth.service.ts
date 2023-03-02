import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async validateUser(password: string, name?: string, email?: string,): Promise<any> {
        const user = await this.userService.findOne(name, email)
        
        if (user) {
            const validated = await bcrypt.compare(password, user.password)
            if (validated) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...result } = user
                return result
            }
        }

        return null
    }
}
