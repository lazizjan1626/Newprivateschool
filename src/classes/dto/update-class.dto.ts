import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './create-class.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {
    className?: string;
    section?: string;
    teacherID?: number;
    classScheduleID?: number;
    attendanceID?:number;
}
