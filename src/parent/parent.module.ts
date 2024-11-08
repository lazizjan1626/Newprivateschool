import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Parent } from './models/parent.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentParents } from './models/studentparents.model';
import { StudentModule } from '../sudent/sudent.module';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('Parent Module')
@Module({
  imports: [SequelizeModule.forFeature([Parent,StudentParents]),
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
  exports: [ParentService,],
  controllers: [ParentController],
  providers: [ParentService],
})
export class ParentModule {}
