import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class } from './models/class.model';
import { ApiTags } from '@nestjs/swagger';




@ApiTags('Classes Module')

@Module({
  imports:[SequelizeModule.forFeature([Class])],
  exports: [ClassesService],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
