import { PartialType } from '@nestjs/swagger';
import { CreateClassScheduleDto } from './create-class-schedule.dto';

export class UpdateClassScheduleDto extends PartialType(CreateClassScheduleDto) {
    classID?: number;
    dayofweek?: string;
    startTime?: string;
    endTime?: string;
}
