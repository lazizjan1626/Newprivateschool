import { PartialType } from '@nestjs/swagger';
import { CreateParentDto } from './create-parent.dto';
import { Gender } from '../../other/types';

export class UpdateParentDto extends PartialType(CreateParentDto) {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    age?: number;
    gender?: Gender
    address?: string;
    relationship?:string;
}
