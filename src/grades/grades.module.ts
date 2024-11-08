import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from './models/grade.model';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('GradesModule')
@Module({
  imports: [SequelizeModule.forFeature([Grade])],
  exports: [GradesService],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
