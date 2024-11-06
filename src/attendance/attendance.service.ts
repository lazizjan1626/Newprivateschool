import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Attendance } from './entities/attendance.model';

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance) private readonly attendanceModel: typeof Attendance){}
  create(createAttendanceDto: CreateAttendanceDto) {
    try {
      const attendanceInstance = this.attendanceModel.create(createAttendanceDto);

      return attendanceInstance;
      
    } catch (error) {
      throw new Error('Failed to create attendance');
      
    }
  }

  findAll() {
    try {
      const attendance = this.attendanceModel.findAll();

      return attendance;
    } catch (error) {
      throw new Error('Failed to find attendances');
      
    }
  }

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

  async remove(id: number) {
    try {
      const attendance = await this.attendanceModel.findByPk(id);

      if (!attendance) {
        throw new Error('Attendance not found');
      }

      await attendance.destroy();

      return {
        message: 'Attendance deleted successfully',
        id: id
      }
      
    } catch (error) {
      throw new Error('Failed to remove attendance');
      
    }

  }
}
