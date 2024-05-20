import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    // PassportModule,
    JwtModule.register({
      global: true,
      secret: 'secret-key', // Use environment variables for production
      signOptions: { expiresIn: '60m' },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
