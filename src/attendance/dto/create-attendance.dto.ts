import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty({
    description: 'ID of the student',
    required: false,
    type: Number,
  })
  studentID?: number;


  @ApiProperty({
    description: 'ID of the Class',
    required: false,
    type: Number,
})
  classID?: number;

  @ApiProperty({
    description: 'The date of attendance',
    type: Date,
    example: '2024-11-07T00:00:00Z',
  })
  attendanceDate: Date;

  @ApiProperty({
    description: 'The status of the attendance (e.g., present, absent)',
    type: String,
    example: 'present',
  })
  status: string;

  @ApiProperty({
    description: 'Indicates whether the parent can view the attendance',
    type: Boolean,
    example: true,
  })
  parentview: boolean;
}
