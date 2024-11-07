import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attendance } from './entities/attendance.model';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Attendance Module')
@Module({
  imports: [SequelizeModule.forFeature([Attendance])],
  exports: [AttendanceService],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
