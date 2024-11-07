import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional, IsDateString, Min, Max } from 'class-validator';

export class CreateGradeDto {
  @ApiProperty({
    description: 'The ID of the student',
    type: Number,
  })
  @IsInt()
  studentID: number;

  @ApiProperty({
    description: 'The ID of the subject',
    type: Number,
  })
  @IsInt()
  subjectID: number;

  @ApiProperty({
    description: 'The grade of the student for the subject',
    type: Number,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  grade: number;

  @ApiProperty({
    description: 'The date when the grade was recorded',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  deteRecorded?: Date;

  @ApiProperty({
    description: 'Flag to indicate if the grade has been viewed by the parent',
    type: Boolean,
  })
  @IsBoolean()
  parentview: boolean;
}
