import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @ApiOperation({ summary: 'Create attendance record' })
  @ApiBody({ type: CreateAttendanceDto })
  @ApiResponse({ status: 201, description: 'Attendance record successfully created.' })
  @Post('create')
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @ApiOperation({ summary: 'Get all attendance records' })
  @ApiResponse({ status: 200, description: 'Successfully fetched all attendance records.' })
  @Get('all')
  findAll() {
    return this.attendanceService.findAll();
  }

  @ApiOperation({ summary: 'Get attendance record by ID' })
  @ApiParam({ name: 'id', description: 'Attendance record ID' })
  @ApiResponse({ status: 200, description: 'Successfully fetched attendance record.' })
  @ApiResponse({ status: 404, description: 'Attendance record not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update attendance record' })
  @ApiParam({ name: 'id', description: 'Attendance record ID' })
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiResponse({ status: 200, description: 'Attendance record successfully updated.' })
  @ApiResponse({ status: 404, description: 'Attendance record not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @ApiOperation({ summary: 'Delete attendance record' })
  @ApiParam({ name: 'id', description: 'Attendance record ID' })
  @ApiResponse({ status: 200, description: 'Attendance record successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Attendance record not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
