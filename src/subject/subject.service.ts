import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subjects } from './models/subject.model';
import { ApiProperty } from '@nestjs/swagger';
import { Grade } from '../grades/models/grade.model';

@Injectable()
export class SubjectService {
  constructor(@InjectModel(Subjects) private readonly subjectModel: typeof Subjects){}


  @ApiProperty({ description: 'Create a new subject' })
  create(createSubjectDto: CreateSubjectDto) {
    try {
      const subject = this.subjectModel.create(createSubjectDto);

      return subject;
      
    } catch (error) {
      throw new Error('Failed to create subject');
      
    }
  }


  @ApiProperty({ description: 'Get all subjects' })
  findAll() {
    try {
      const subject = this.subjectModel.findAll();

      return subject;
      
    } catch (error) {
      throw new Error('Failed to find subjects');
      
    }
  }

  @ApiProperty({
    description: 'Update an existing subject by ID',
  })
  findOne(id: number) {
    try {
      const subject = this.subjectModel.findByPk(id,{
        include: [{ 
          model: Grade,
          as: 'grades',
          attributes:[
            'id',
            'grade',
            'deteRecorded',
            'subjectID',
          ]
         }],
      });

      if (!subject) {
        throw new Error('Subject not found');
      }

      return subject;
      
    } catch (error) {
      throw new Error('Failed to find subject with ID'+ id);
      
    }
  }
  @ApiProperty({
    description: 'Update an existing subject by ID',
  })
  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    try {
      const subject = await this.findOne(id);

      if (!subject) {
        throw new Error('Subject not found');
      }

      await subject.update(updateSubjectDto);

      return subject;
      
    } catch (error) {
      throw new Error('Failed to update subject with ID'+ id);
      
    }
    
  }


  @ApiProperty({
    description: 'Remove an existing subject by ID',
  })
  async remove(id: number) {
    try {
      const subject = await this.findOne(id);

      if (!subject) {
        throw new Error('Subject not found');
      }

      await subject.destroy();
      return {
        message: `Removed ${id}`,
      }
      
    } catch (error) {
      throw new Error('Failed to remove subject with ID'+ id);
      
    }
  }
}
