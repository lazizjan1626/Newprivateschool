import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Teacher])
  ,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
    }),
  }),
],
  exports: [TeachersService],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
