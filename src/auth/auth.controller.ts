import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
// import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Log in a user' })
    @ApiResponse({ status: 200, description: 'Successful login', type: String })
    async login(@Body() loginDto: LoginDto): Promise<any> {
        return await this.authService.login(loginDto);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered', type: String })
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        return await this.authService.register(registerDto);
    }

    // @UseGuards(JwtAuthGuard)
    // @Post('profile')
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}
