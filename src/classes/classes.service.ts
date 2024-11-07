import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from './models/class.model';
import { ClassSchedule } from '../class-schedule/models/class-schedule.modul';
import { Attendance } from '../attendance/entities/attendance.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(Class) private readonly classModel: typeof Class) {}

  @ApiOperation({ summary: 'Create a new class' })
  @ApiResponse({ status: 201, description: 'Class created successfully', type: Class })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(createClassDto: CreateClassDto) {
    try {
      const classInstance = this.classModel.create(createClassDto);
      return classInstance;
    } catch (error) {
      throw new Error('Failed to create class');
    }
  }

  @ApiOperation({ summary: 'Retrieve all classes with attendance and schedule information' })
  @ApiResponse({ status: 200, description: 'List of all classes with related data', type: [Class] })
  findAll() {
    try {
      const classes = this.classModel.findAll({
        include: [
          {
            model: Attendance,
            attributes: ['id', 'status', 'attendanceDate'],
          },
          {
            model: ClassSchedule,
            attributes: ['id', 'dayofweek', 'startTime', 'endTime'],
          },
        ],
      });
      return classes;
    } catch (error) {
      throw new Error('Failed to find classes');
    }
  }

  @ApiOperation({ summary: 'Retrieve a class by its ID with attendance and schedule information' })
  @ApiResponse({ status: 200, description: 'Class found with the provided ID', type: Class })
  @ApiResponse({ status: 404, description: 'Class not found' })
  async findOne(id: number) {
    try {
      const classInstance = await this.classModel.findByPk(id, {
        include: [
          {
            model: ClassSchedule,
            attributes: ['id', 'dayofweek', 'startTime', 'endTime'],
          },
          {
            model: Attendance,
            attributes: ['id', 'status', 'attendanceDate'],
          },
        ],
      });

      if (!classInstance) {
        throw new Error('Class not found');
      }

      return classInstance;
    } catch (error) {
      throw new Error('Failed to find class with ID ' + id);
    }
  }

  @ApiOperation({ summary: 'Update a class by its ID' })
  @ApiResponse({ status: 200, description: 'Class updated successfully', type: Class })
  @ApiResponse({ status: 404, description: 'Class not found' })
  async update(id: number, updateClassDto: UpdateClassDto) {
    try {
      const classInstance = await this.findOne(id);

      if (!classInstance) {
        throw new Error('Class not found');
      }

      await classInstance.update(updateClassDto);
      return classInstance;
    } catch (error) {
      throw new Error('Failed to update class with ID ' + id);
    }
  }

  @ApiOperation({ summary: 'Delete a class by its ID' })
  @ApiResponse({ status: 200, description: 'Class deleted successfully' })
  @ApiResponse({ status: 404, description: 'Class not found' })
  async remove(id: number) {
    try {
      const classInstance = await this.findOne(id);

      if (!classInstance) {
        throw new Error('Class not found');
      }

      await classInstance.destroy();
      return { message: 'Class deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete class with ID ' + id);
    }
  }
}
