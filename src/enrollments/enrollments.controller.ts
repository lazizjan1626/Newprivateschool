import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Enrollment } from './models/enrollment.model';

@ApiTags('Enrollments') // Swagger uchun guruh nomi
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new enrollment' })
  @ApiResponse({
    status: 201,
    description: 'The enrollment has been successfully created.',
    type: Enrollment,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all enrollments.',
    type: [Enrollment],
  })
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single enrollment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched the enrollment.',
    type: Enrollment,
  })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  findOne(@Param('id') id: string) {
    return this.enrollmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update enrollment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The enrollment has been successfully updated.',
    type: Enrollment,
  })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(+id, updateEnrollmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete enrollment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The enrollment has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(+id);
  }
}
