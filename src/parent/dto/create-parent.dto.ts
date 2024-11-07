import { Gender } from "../../other/types";
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsInt, IsBoolean, Min, Max, IsEnum } from 'class-validator';

export class CreateParentDto {
    @ApiProperty({
        description: 'The first name of the parent',
        example: 'John',
    })
    @IsString()
    first_name: string;

    @ApiProperty({
        description: 'The last name of the parent',
        example: 'Doe',
    })
    @IsString()
    last_name: string;

    @ApiProperty({
        description: 'The email address of the parent',
        example: 'johndoe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password for the parent',
        example: 'strongpassword123',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'The age of the parent (must be between 18 and 100)',
        example: 35,
        minimum: 18,
        maximum: 100,
    })
    @IsInt()
    @Min(18)
    @Max(100)
    age: number;

    @ApiProperty({
        description: 'The gender of the parent',
        enum: Gender,
        example: Gender.MALE
    })
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty({
        description: 'The address of the parent',
        example: '123 Main St, City, Country',
    })
    @IsString()
    address: string;

    @ApiProperty({
        description: 'The relationship of the parent (e.g., mother, father)',
        example: 'Mother',
    })
    @IsString()
    relationship: string;

    @ApiProperty({
        description: 'Whether the parent is active or not',
        example: true,
    })
    @IsBoolean()
    is_active: boolean;
}
