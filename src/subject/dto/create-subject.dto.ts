import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateSubjectDto {
  
  @ApiProperty({
    description: 'Name of the subject',
    example: 'Mathematics',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50) 
  subjectName: string;
}
