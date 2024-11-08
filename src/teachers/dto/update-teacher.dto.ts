import { PartialType } from '@nestjs/swagger';
import { CreateTeacherDto } from './create-teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    subjectID?: number;
    hireDate?:Date;
    address?: string;
    is_active?: boolean;
    roleID?:number
}
