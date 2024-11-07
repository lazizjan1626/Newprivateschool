import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional, IsDateString, Min, Max } from 'class-validator';
import { CreateGradeDto } from './create-grade.dto';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {
  @ApiProperty({
    description: 'The ID of the student',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  studentID?: number;

  @ApiProperty({
    description: 'The ID of the subject',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  subjectID?: number;

  @ApiProperty({
    description: 'The grade of the student for the subject',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  grade?: number;

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
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  parentview?: boolean;
}
