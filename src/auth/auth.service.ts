import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.usersService.findUserByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            return user;
        }
        return null;
    }

    async login(user: LoginDto) {
        const  { email, password } = user;

        const authUser = await this.validateUser(email, password)
        if(authUser) {
            return {
                access_token: this.jwtService.sign(authUser.email),
            };
        }

        return null;


    }

    async register({email, password}: RegisterDto) {
        const user = await this.usersService.createUser(email, password);
        return this.login(user);
    }
}
