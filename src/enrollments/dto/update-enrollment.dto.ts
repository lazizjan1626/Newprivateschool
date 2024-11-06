import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './create-enrollment.dto';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
    studentID?: number;
    classID?: number;
    enrollmentDate?: Date;
}
