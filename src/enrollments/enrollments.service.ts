import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './models/enrollment.model';
import { InjectModel } from '@nestjs/sequelize';
import { ApiTags, ApiOperation, ApiResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('Enrollments') 
@Injectable()
export class EnrollmentsService {
  constructor(@InjectModel(Enrollment) private readonly enrollmentModel: typeof Enrollment) {}

  @ApiOperation({ summary: 'Create new enrollment' })
  @ApiResponse({ status: 201, description: 'Enrollment successfully created.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error occurred' })
  create(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      return this.enrollmentModel.create(createEnrollmentDto);
    } catch (error) {
      throw new Error('Failed to create enrollment');
    }
  }

  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({ status: 200, description: 'All enrollments retrieved successfully.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error occurred' })
  findAll() {
    try {
      return this.enrollmentModel.findAll();
    } catch (error) {
      throw new Error('Failed to retrieve enrollments');
    }
  }

  @ApiOperation({ summary: 'Get a single enrollment by ID' })
  @ApiResponse({ status: 200, description: 'Enrollment found.' })
  @ApiNotFoundResponse({ description: 'Enrollment not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error occurred' })
  findOne(id: number) {
    try {
      const enrollment = this.enrollmentModel.findByPk(id);
      if (!enrollment) {
        throw new Error('Enrollment not found');
      }
      return enrollment;
    } catch (error) {
      throw new Error('Failed to find enrollment with ID ' + id);
    }
  }

  @ApiOperation({ summary: 'Update an existing enrollment' })
  @ApiResponse({ status: 200, description: 'Enrollment successfully updated.' })
  @ApiNotFoundResponse({ description: 'Enrollment not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error occurred' })
  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    try {
      const affectedRows = await this.enrollmentModel.update(updateEnrollmentDto, { where: { id } });
      if (!affectedRows) {
        throw new Error('Enrollment not found');
      }
  
      return { message: 'Enrollment successfully updated',
        affectedRows: affectedRows
       };
    } catch (error) {
      throw new Error('Failed to update enrollment with ID ' + id);
    }
  }
  

  @ApiOperation({ summary: 'Delete an enrollment' })
  @ApiResponse({ status: 200, description: 'Enrollment successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Enrollment not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error occurred' })
  async remove(id: number) {
    try {
      const user = await this.enrollmentModel.destroy({ where: { id } });
      return { 
        user: user,
        message: 'Enrollment successfully deleted'}

    } catch (error) {
      throw new Error('Failed to delete enrollment with ID ' + id);
    }
  }
}
