import { Injectable } from '@nestjs/common';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassSchedule } from './models/class-schedule.modul';

@Injectable()
export class ClassScheduleService {
  constructor(@InjectModel(ClassSchedule) private readonly classScheduleModel: typeof ClassSchedule) {}

  @ApiOperation({ summary: 'Create a new class schedule' })
  @ApiResponse({ status: 201, description: 'Class schedule has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request, validation error or missing data.' })
  create(createClassScheduleDto: CreateClassScheduleDto) {
    try {
      const classSchedule = this.classScheduleModel.create(createClassScheduleDto);
      return classSchedule;
    } catch (error) {
      throw new Error('Failed to create classSchedule');
    }
  }

  @ApiOperation({ summary: 'Get all class schedules' })
  @ApiResponse({ status: 200, description: 'Return all available class schedules.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findAll() {
    try {
      const classSchedules = this.classScheduleModel.findAll();
      return classSchedules;
    } catch (error) {
      throw new Error('Failed to find classSchedules');
    }
  }

  @ApiOperation({ summary: 'Get a class schedule by its ID' })
  @ApiResponse({ status: 200, description: 'Class schedule found and returned.' })
  @ApiResponse({ status: 404, description: 'Class schedule not found with the given ID.' })
  findOne(id: number) {
    try {
      const classSchedule = this.classScheduleModel.findByPk(id);

      if (!classSchedule) {
        throw new Error('ClassSchedule not found');
      }

      return classSchedule;
    } catch (error) {
      throw new Error('Failed to find classSchedule with ID ' + id);
    }
  }

  @ApiOperation({ summary: 'Update an existing class schedule by ID' })
  @ApiResponse({ status: 200, description: 'Class schedule updated successfully.' })
  @ApiResponse({ status: 404, description: 'Class schedule not found with the provided ID.' })
  async update(id: number, updateClassScheduleDto: UpdateClassScheduleDto) {
    try {
      const classSchedule = await this.findOne(id);

      if (!classSchedule) {
        throw new Error('ClassSchedule not found');
      }

      return classSchedule.update(updateClassScheduleDto);
    } catch (error) {
      throw new Error('Failed to update classSchedule with ID ' + id);
    }
  }

  @ApiOperation({ summary: 'Delete a class schedule by ID' })
  @ApiResponse({ status: 200, description: 'Class schedule deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Class schedule not found with the given ID.' })
  async remove(id: number) {
    try {
      const classSchedule = await this.findOne(id);

      if (!classSchedule) {
        throw new Error('ClassSchedule not found');
      }

      classSchedule.destroy();
      return `ClassSchedule with ID ${id} deleted successfully`;
    } catch (error) {
      throw new Error('Failed to delete classSchedule with ID ' + id);
    }
  }
}
