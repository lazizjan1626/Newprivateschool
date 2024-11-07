import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateParentDto } from './create-parent.dto';
import { Gender } from '../../other/types';

export class UpdateParentDto extends PartialType(CreateParentDto) {
    @ApiProperty({
        description: 'The first name of the parent',
        example: 'John',
        required: false, 
    })
    first_name?: string;

    @ApiProperty({
        description: 'The last name of the parent',
        example: 'Doe',
        required: false,
    })
    last_name?: string;

    @ApiProperty({
        description: 'The email address of the parent',
        example: 'johndoe@example.com',
        required: false,
    })
    email?: string;

    @ApiProperty({
        description: 'The password for the parent',
        example: 'strongpassword123',
        required: false,
    })
    password?: string;

    @ApiProperty({
        description: 'The age of the parent',
        example: 35,
        required: false, 
        minimum: 18,
        maximum: 100,
    })
    age?: number;

    @ApiProperty({
        description: 'The gender of the parent',
        enum: Gender,
        required: false, 
        example: Gender.MALE,
    })
    gender?: Gender;

    @ApiProperty({
        description: 'The address of the parent',
        example: '123 Main St, City, Country',
        required: false,
    })
    address?: string;

    @ApiProperty({
        description: 'The relationship of the parent (e.g., mother, father)',
        example: 'Mother',
        required: false,
    })
    relationship?: string;

    @ApiProperty({
        description: 'Whether the parent is active or not',
        example: true,
        required: false,
    })
    is_active?: boolean;
}
