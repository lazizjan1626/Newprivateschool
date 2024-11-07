import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsIn, IsISO8601, IsOptional } from 'class-validator';
import { CreateClassScheduleDto } from './create-class-schedule.dto';

export class UpdateClassScheduleDto extends PartialType(CreateClassScheduleDto) {
  @ApiPropertyOptional({
    description: 'ID of the class',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  classID?: number;

  @ApiPropertyOptional({
    description: 'Day of the week for the class',
    example: 'Monday',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
  @IsOptional()
  dayofweek?: string;

  @ApiPropertyOptional({
    description: 'Start time of the class in ISO 8601 format',
    example: '09:00',
  })
  @IsString()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  @IsOptional()
  startTime?: string;

  @ApiPropertyOptional({
    description: 'End time of the class in ISO 8601 format',
    example: '10:30',
  })
  @IsString()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  @IsOptional()
  endTime?: string;
}
