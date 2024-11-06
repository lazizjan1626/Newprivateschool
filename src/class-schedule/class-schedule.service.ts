import { Injectable } from '@nestjs/common';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ClassSchedule } from './models/class-schedule.modul';


@Injectable()
export class ClassScheduleService {
  constructor(@InjectModel(ClassSchedule) private readonly classScheduleModel :typeof ClassSchedule){}
  create(createClassScheduleDto: CreateClassScheduleDto) {
    try {
      const classSchedule = this.classScheduleModel.create(createClassScheduleDto);

      return classSchedule;
      
    } catch (error) {
      throw new Error('Failed to create classSchedule');
      
    }
  }

  findAll() {
    try {
      const classSchedule = this.classScheduleModel.findAll();
      return classSchedule;
      
    } catch (error) {
      throw new Error('Failed to find classSchedules');
      
    }
  }

  findOne(id: number) {
    try {
      const classSchedule = this.classScheduleModel.findByPk(id);

      if (!classSchedule) {
        throw new Error('ClassSchedule not found');
      }

      return classSchedule;
      
    } catch (error) {
      throw new Error('Failed to find classSchedule with ID'+ id);
      
    }
  }

  async update(id: number, updateClassScheduleDto: UpdateClassScheduleDto) { 
    try {
      const classSchedule = await this.findOne(id);

      if (!classSchedule) {
        throw new Error('ClassSchedule not found');
      }

      return classSchedule.update(updateClassScheduleDto);
      
    } catch (error) {
      throw new Error('Failed to update classSchedule with ID'+ id);
      
    }
  }

  async remove(id: number) {
    try {
      const classSchedule = await this.findOne(id);

      if (!classSchedule) {
        throw new Error('ClassSchedule not found');
      }

      classSchedule.destroy();
      return `ClassSchedule with ID ${id} deleted successfully`;
      
    } catch (error) {
      throw new Error('Failed to delete classSchedule with ID'+ id);
      
    }
  }
}
