import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './create-enrollment.dto';
import { IsOptional, IsNumber, IsDate } from 'class-validator';

export class UpdateEnrollmentDto extends PartialType(CreateEnrollmentDto) {
  
  @ApiProperty({
    description: 'ID of the student enrolling (Optional)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  studentID?: number;

  @ApiProperty({
    description: 'ID of the class the student is enrolling in (Optional)',
    example: 101,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  classID?: number;

  @ApiProperty({
    description: 'Date the student enrolled (Optional)',
    example: '2024-11-07T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  enrollmentDate?: Date;
}
