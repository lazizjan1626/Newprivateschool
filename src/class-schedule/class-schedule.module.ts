import { Module } from '@nestjs/common';
import { ClassScheduleService } from './class-schedule.service';
import { ClassScheduleController } from './class-schedule.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassSchedule } from './models/class-schedule.modul';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('ClassSchedule Module')
@Module({
  imports: [
    SequelizeModule.forFeature([ClassSchedule])
  ],
  exports: [ClassScheduleService],
  controllers: [ClassScheduleController],
  providers: [ClassScheduleService],
})
export class ClassScheduleModule {}
