import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsIn, IsISO8601 } from 'class-validator';

export class CreateClassScheduleDto {
  @ApiProperty({
    description: 'ID of the class',
    example: 1,
  })
  @IsInt()
  classID: number;

  @ApiProperty({
    description: 'Day of the week for the class',
    example: 'Monday',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
  dayofweek: string;

  @ApiProperty({
    description: 'Start time of the class in ISO 8601 format',
    example: '09:00',
  })
  @IsString()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  startTime: string;

  @ApiProperty({
    description: 'End time of the class in ISO 8601 format',
    example: '10:30',
  })
  @IsString()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  endTime: string;
}
