import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Grade } from './models/grade.model';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade) private readonly gradeModel: typeof Grade){}


  create(createGradeDto: CreateGradeDto) {
    try {
      createGradeDto.deteRecorded = new Date()
      const grade = this.gradeModel.create(createGradeDto);

      return grade;
      
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create grade');
    }
  }

  findAll() {
    try {
      const grade = this.gradeModel.findAll();
      return grade;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find grades');
    }
  }

  findOne(id: number) {
    try {
      const grade = this.gradeModel.findByPk(id);

      if (!grade) {
        throw new Error('Grade not found');
      }

      return grade;
      
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find grade');
    }
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    try {
      const grade = await this.gradeModel.findByPk(id);

      if (!grade) {
        throw new Error('Grade not found');
      }

      return grade.update(updateGradeDto);
      
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update grade');
    }
  }

   async remove(id: number) {
    try {
      const grade = await this.gradeModel.findByPk(id);

      if (!grade) {
        throw new Error('Grade not found');
      }
      grade.destroy()

      return [
        {
          message: `Grade with ID ${id} deleted successfully`,
          id: id
        }
      ];
      
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete grade');
    }
  }
}
