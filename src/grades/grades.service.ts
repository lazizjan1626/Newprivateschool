import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Grade } from './models/grade.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class GradesService {
  constructor(@InjectModel(Grade) private readonly gradeModel: typeof Grade) {}

  @ApiOperation({ summary: 'Create a new grade record' })
  @ApiResponse({ status: 201, description: 'Grade successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(createGradeDto: CreateGradeDto) {
    try {
      createGradeDto.deteRecorded = new Date();
      const grade = this.gradeModel.create(createGradeDto);
      return grade;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create grade');
    }
  }

  @ApiOperation({ summary: 'Get all grade records' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all grades' })
  findAll() {
    try {
      const grade = this.gradeModel.findAll();
      return grade;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find grades');
    }
  }

  @ApiOperation({ summary: 'Get grade record by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved grade' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
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

  @ApiOperation({ summary: 'Update grade record by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated grade' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
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

  @ApiOperation({ summary: 'Delete grade record by ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted grade' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  async remove(id: number) {
    try {
      const grade = await this.gradeModel.findByPk(id);

      if (!grade) {
        throw new Error('Grade not found');
      }
      grade.destroy();

      return [
        {
          message: `Grade with ID ${id} deleted successfully`,
          id: id,
        },
      ];
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete grade');
    }
  }
}
