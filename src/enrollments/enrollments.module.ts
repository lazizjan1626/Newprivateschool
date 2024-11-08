import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Enrollment } from './models/enrollment.model';
import { EnrollmentsController } from './enrollments.controller';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Enrollments')
@Module({
  imports: [SequelizeModule.forFeature([Enrollment])],
  exports: [EnrollmentsService],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
