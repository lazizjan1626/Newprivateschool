import { PartialType } from '@nestjs/swagger';
import { CreateSudentDto } from './create-sudent.dto';
import { Gender } from '../../other/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsBoolean, IsDateString, IsPhoneNumber, IsOptional, IsInt } from 'class-validator';

export class UpdateSudentDto extends PartialType(CreateSudentDto) {

    @ApiProperty({
        description: 'The first name of the student',
        example: 'John',
        required: false,
    })
    @IsString()
    @IsOptional()  // Make it optional since it's a partial update
    firstName: string;

    @ApiProperty({
        description: 'The last name of the student',
        example: 'Doe',
        required: false,
    })
    @IsString()
    @IsOptional()  // Make it optional
    lastName: string;

    @ApiProperty({
        description: 'The birth date of the student (in ISO format)',
        example: '2000-01-01',
        required: false,
    })
    @IsDateString()
    @IsOptional()  // Make it optional
    birthDate: string;

    @ApiProperty({
        description: 'Gender of the student',
        enum: Gender,
        example: Gender.MALE,
        required: false,
    })
    @IsOptional()  // Make it optional
    gender: Gender;

    @ApiProperty({
        description: 'The address of the student',
        example: '1234 Elm Street',
        required: false,
    })
    @IsString()
    @IsOptional()  // Make it optional
    adress: string;

    @ApiProperty({
        description: 'The phone number of the student',
        example: '+1234567890',
        required: false,
    })
    @IsPhoneNumber(null)  // Validate phone number format
    @IsOptional()  // Make it optional
    phone_number: string;

    @ApiProperty({
        description: 'The email of the student',
        example: 'john.doe@example.com',
        required: false,
    })
    @IsEmail()
    @IsOptional()  // Make it optional
    email: string;

    @ApiProperty({
        description: 'The hashed password for the student account',
        example: 'strongpassword123',
        required: false,
    })
    @IsString()
    @IsOptional()  // Make it optional
    hashes_password: string;

    @ApiProperty({
        description: 'The enrollment date of the student',
        example: '2022-09-01',
        required: false,
    })
    @IsDateString()
    @IsOptional()  // Make it optional
    enrollmentDete: string;

    @ApiProperty({
        description: 'Status of the student account (active or inactive)',
        example: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()  // Make it optional
    is_active: boolean;

    @ApiProperty({
        description: 'The ID of the class the student is assigned to',
        example: 1,
        required: false,
    })
    @IsInt()
    @IsOptional()  // Make it optional
    classID: number;
}
