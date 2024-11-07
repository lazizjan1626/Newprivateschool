import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new grade record' })
  @ApiResponse({ status: 201, description: 'Grade successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all grade records' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all grades' })
  findAll() {
    return this.gradesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get grade record by ID' })
  @ApiParam({ name: 'id', description: 'ID of the grade record to fetch' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved grade record' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  findOne(@Param('id') id: string) {
    return this.gradesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update grade record by ID' })
  @ApiParam({ name: 'id', description: 'ID of the grade record to update' })
  @ApiResponse({ status: 200, description: 'Successfully updated grade record' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(+id, updateGradeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete grade record by ID' })
  @ApiParam({ name: 'id', description: 'ID of the grade record to delete' })
  @ApiResponse({ status: 200, description: 'Successfully deleted grade record' })
  @ApiResponse({ status: 404, description: 'Grade not found' })
  remove(@Param('id') id: string) {
    return this.gradesService.remove(+id);
  }
}
