import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User as UserEntity } from './entities/user.entity';

@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Get user information' })
    @ApiResponse({ status: 200, description: 'User information', type: UserEntity })
    async getUser(@Param('id') id: number): Promise<User> {
        return await  this.usersService.findUserById(id);
    }
}
