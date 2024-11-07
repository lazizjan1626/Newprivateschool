import { Module } from '@nestjs/common';
import { SudentService } from './sudent.service';
import { SudentController } from './sudent.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/sudent.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentParents } from '../parent/models/studentparents.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Student,StudentParents
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: process.env.ACCESS_TOKEN_TIME },
      }),
    }),
    StudentModule

  ],
  exports: [SudentService],
  controllers: [SudentController],
  providers: [SudentService],
})
export class StudentModule {}
