import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAttendanceDto } from './create-attendance.dto';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  @ApiProperty({
    description: 'ID of the student (optional for update)',
    required: false,
    type: Number,
  })
  studentID?: number;

  @ApiProperty({
    description: 'The date of attendance (optional for update)',
    required: false,
    type: Date,
    example: '2024-11-07T00:00:00Z',
  })
  attendanceDate?: Date;

  @ApiProperty({
    description: 'The status of the attendance (optional for update)',
    required: false,
    type: String,
    example: 'absent',
  })
  status?: string;

  @ApiProperty({
    description: 'Indicates whether the parent can view the attendance (optional for update)',
    required: false,
    type: Boolean,
    example: true,
  })
  parentview?: boolean;
}
