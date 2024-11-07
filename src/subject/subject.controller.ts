import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Subject') 
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new subject' })
  @ApiResponse({ status: 201, description: 'subject created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all subject' })
  @ApiResponse({ status: 200, description: 'subject retrieved successfully' })
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a subject by ID' })
  @ApiParam({ name: 'id', description: 'ID of the subject to retrieve', example: '1' })
  @ApiResponse({ status: 200, description: 'subject retrieved successfully' })
  @ApiResponse({ status: 404, description: 'subject not found' })
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subject by ID' })
  @ApiParam({ name: 'id', description: 'ID of the subject to update', example: '1' })
  @ApiResponse({ status: 200, description: 'subject updated successfully' })
  @ApiResponse({ status: 404, description: 'subject not found' })
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'ID of the subject to delete', example: '1' })
  @ApiResponse({ status: 200, description: 'subject deleted successfully' })
  @ApiResponse({ status: 404, description: 'subject not found' })
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
