import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  
  @ApiProperty({
    description: 'ID of the student enrolling',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  studentID: number;

  @ApiProperty({
    description: 'ID of the class the student is enrolling in',
    example: 101,
  })
  @IsNumber()
  @IsNotEmpty()
  classID: number;

  @ApiProperty({
    description: 'Date the student enrolled',
    example: '2024-11-07T00:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  enrollmentDate: Date;
}
