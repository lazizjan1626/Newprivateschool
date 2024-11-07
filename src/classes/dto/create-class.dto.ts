import { IsString, IsInt, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  
  @ApiProperty({
    description: 'The name of the class',
    example: 'Mathematics',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Class name cannot be empty' })
  className: string;

  @ApiProperty({
    description: 'The section of the class (e.g., A, B, C)',
    example: 'A',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Section cannot be empty' })
  section: string;

  @ApiProperty({
    description: 'The ID of the teacher',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty({ message: 'Teacher ID cannot be empty' })
  teacherID: number;

  @ApiProperty({
    description: 'The ID of the class schedule (optional)',
    example: 1,
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'Class Schedule ID must be a number' })
  classScheduleID?: number;

  @ApiProperty({
    description: 'The ID of the attendance record associated with the class',
    example: 1,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty({ message: 'Attendance ID cannot be empty' })
  attendanceID: number;
}
