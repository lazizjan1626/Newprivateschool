import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subjects } from './models/subject.model';

@Injectable()
export class SubjectService {
  constructor(@InjectModel(Subjects) private readonly subjectModel: typeof Subjects){}

  create(createSubjectDto: CreateSubjectDto) {
    try {
      const subject = this.subjectModel.create(createSubjectDto);

      return subject;
      
    } catch (error) {
      throw new Error('Failed to create subject');
      
    }
  }

  findAll() {
    try {
      const subject = this.subjectModel.findAll();

      return subject;
      
    } catch (error) {
      throw new Error('Failed to find subjects');
      
    }
  }

  findOne(id: number) {
    try {
      const subject = this.subjectModel.findByPk(id);

      if (!subject) {
        throw new Error('Subject not found');
      }

      return subject;
      
    } catch (error) {
      throw new Error('Failed to find subject with ID'+ id);
      
    }
  }

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
