import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Class } from './models/class.model';
import { ClassSchedule } from '../class-schedule/models/class-schedule.modul';
import { Attendance } from '../attendance/entities/attendance.model';

@Injectable()
export class ClassesService {
  constructor(@InjectModel(Class) private readonly classModel: typeof Class){
  }
  create(createClassDto: CreateClassDto) {
    try {
      const classInstance = this.classModel.create(createClassDto);

      return classInstance;
      
    } catch (error) {
      throw new Error('Failed to create class');
      
    }
  }

  findAll() {
    try {
      const classes = this.classModel.findAll(
        {
          include: [
            {
              model: Attendance,
              attributes: [
              'id',
              'status',
              'attendanceDate',
              ],
            },
            
           {
            model: ClassSchedule,
            
            attributes:[
              'id',
              'dayofweek',
              'startTime',
              'endTime',

            ]
          },

        ]
        }
        
      );
      return classes;
      
    } catch (error) {
      throw new Error('Failed to find classes');
      
    }
  }

  async findOne(id: number) {
    try {
      const classInstance = await this.classModel.findByPk(id, {
        include: [
          {
            model: ClassSchedule,
            attributes: [
              'id',
              'dayofweek',
              'startTime',
              'endTime',
            ],
          },
          {
            model: Attendance,
            attributes: [
              'id',
              'status',
              'attendanceDate',
            ],
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
  

  async update(id: number, updateClassDto: UpdateClassDto) { 
    try {
      const classInstance = await this.findOne(id);

      if (!classInstance) {
        throw new Error('Class not found');
      }

      await classInstance.update(updateClassDto);

      return classInstance;
      
    } catch (error) {
      throw new Error('Failed to update class with ID'+ id);
      
    }
   }

  async remove(id: number) {
    try {
      const classInstance = await this.findOne(id);

      if (!classInstance) {
        throw new Error('Class not found');
      }

      await classInstance.destroy();

      return{message: 'Class deleted successfully'};
      
    } catch (error) {
      throw new Error('Failed to delete class with ID'+ id);
      
    }
  }
}
