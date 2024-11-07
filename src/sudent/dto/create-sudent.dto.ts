import { Gender } from "../../other/types";
import { ApiProperty } from '@nestjs/swagger';

export class CreateSudentDto {

    @ApiProperty({
        description: 'The first name of the student',
        example: 'John',
    })
    firstName: string;

    @ApiProperty({
        description: 'The last name of the student',
        example: 'Doe',
    })
    lastName: string;

    @ApiProperty({
        description: 'The birth date of the student (in ISO format)',
        example: '2000-01-01',
    })
    birthDate: string;

    @ApiProperty({
        description: 'Gender of the student',
        enum: Gender,  
        example: Gender.MALE,
    })
    gender: Gender;

    @ApiProperty({
        description: 'The address of the student',
        example: '1234 Elm Street',
    })
    adress: string;

    @ApiProperty({
        description: 'The phone number of the student',
        example: '+1234567890',
    })
    phone_number: string;

    @ApiProperty({
        description: 'The email of the student',
        example: 'john.doe@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'The password for the student account',
        example: 'strongpassword123',
    })
    password: string;

    @ApiProperty({
        description: 'The enrollment date of the student',
        example: '2022-09-01',
    })
    enrollmentDete: string;

    @ApiProperty({
        description: 'Status of the student account (active or inactive)',
        example: true,
    })
    is_active: boolean;

    @ApiProperty({
        description: 'The ID of the class the student is assigned to',
        example: 1,
    })
    classID: number;
}
