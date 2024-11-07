import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subjects } from './models/subject.model';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('Subject Module') 
@Module({
  imports: [SequelizeModule.forFeature([Subjects])],
  exports: [SubjectService],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
