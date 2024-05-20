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

     omit (obj, keys)  {
        if (!keys.length) return obj;
        const key = keys.pop();
        const parts = key.split(".");
        if (parts.length > 1) {
            const { [parts[0]]: todo, ...rest } = obj;
            return {
                ...this.omit(rest, keys),
                [parts[0]]: this.omit(todo, [parts[1]]),
            };
        }
        const { [key]: omitted, ...rest } = obj;
        return this.omit(rest, keys);
    }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.usersService.findUserByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            console.log(user);
            return user;
        }
        return null;
    }

    async login(user: LoginDto) {
        const  { email, password } = user;

        const authUser = await this.validateUser(email, password)
        if(authUser) {
            return {
                access_token: this.jwtService.sign(authUser),
                user: this.omit(authUser, ['password'])
            };
        }

        return {};


    }

    async register({email, password}: RegisterDto) {
        const user = await this.usersService.createUser(email, password);
        return  {
            access_token: this.jwtService.sign(user),
            user: this.omit(user, ['password'])
        };;
    }
}
