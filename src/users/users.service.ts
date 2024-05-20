import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }


    async createUser(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
    }

    async findUserByEmail(email: string): Promise<User> {
        return await  this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findUserById(id: number): Promise<User> {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }
}
