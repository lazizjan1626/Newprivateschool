import { PartialType } from '@nestjs/swagger';
import { CreateAttendanceDto } from './create-attendance.dto';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
    studentID?: number;
    attendanceDate?:Date;
    status?:string;
    parentview?:boolean;
}
