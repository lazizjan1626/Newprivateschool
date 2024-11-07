import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from './entities/attendance.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Attendance') // Swagger uchun kategoriya nomi
@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance) private readonly attendanceModel: typeof Attendance) {}

  @ApiOperation({ summary: 'Create attendance record' })
  @ApiResponse({ status: 201, description: 'Attendance record created successfully.' })
  @ApiResponse({ status: 400, description: 'Failed to create attendance.' })
  create(createAttendanceDto: CreateAttendanceDto) {
    try {
      const attendanceInstance = this.attendanceModel.create(createAttendanceDto);
      return attendanceInstance;
    } catch (error) {
      throw new Error('Failed to create attendance');
    }
  }

  @ApiOperation({ summary: 'Find all attendance records' })
  @ApiResponse({ status: 200, description: 'Successfully fetched all attendance records.' })
  @ApiResponse({ status: 400, description: 'Failed to find attendances.' })
  findAll() {
    try {
      const attendance = this.attendanceModel.findAll();
      return attendance;
    } catch (error) {
      throw new Error('Failed to find attendances');
    }
  }

  @ApiOperation({ summary: 'Find attendance record by ID' })
  @ApiResponse({ status: 200, description: 'Successfully fetched attendance record.' })
  @ApiResponse({ status: 404, description: 'Attendance record not found.' })
  findOne(id: number) {
    try {
      const attendance = this.attendanceModel.findByPk(id);
      if (!attendance) {
        throw new Error('Attendance not found');
      }
      return attendance;
    } catch (error) {
      throw new Error('Failed to find attendance');
    }
  }

  @ApiOperation({ summary: 'Update attendance record by ID' })
  @ApiResponse({ status: 200, description: 'Attendance record updated successfully.' })
  @ApiResponse({ status: 404, description: 'Attendance record not found.' })
  @ApiResponse({ status: 400, description: 'Failed to update attendance.' })
  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    try {
      const attendance = await this.attendanceModel.findByPk(id);
      if (!attendance) {
        throw new Error('Attendance not found');
      }
      await attendance.update(updateAttendanceDto);
      return attendance;
    } catch (error) {
      throw new Error('Failed to update attendance');
    }
  }

  @ApiOperation({ summary: 'Delete attendance record by ID' })
  @ApiResponse({ status: 200, description: 'Attendance record deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Attendance record not found.' })
  @ApiResponse({ status: 400, description: 'Failed to delete attendance.' })
  async remove(id: number) {
    try {
      const attendance = await this.attendanceModel.findByPk(id);
      if (!attendance) {
        throw new Error('Attendance not found');
      }
      await attendance.destroy();
      return {
        message: 'Attendance deleted successfully',
        id: id,
      };
    } catch (error) {
      throw new Error('Failed to remove attendance');
    }
  }
}
