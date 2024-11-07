import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Class } from './models/class.model';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @ApiOperation({ summary: 'Create a new class' })
  @ApiResponse({ status: 201, description: 'Class created successfully', type: Class })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('create')
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @ApiOperation({ summary: 'Retrieve all classes' })
  @ApiResponse({ status: 200, description: 'List of all classes', type: [Class] })
  @Get('all')
  findAll() {
    return this.classesService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a class by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the class to be retrieved' })
  @ApiResponse({ status: 200, description: 'Class details', type: Class })
  @ApiResponse({ status: 404, description: 'Class not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a class by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the class to be updated' })
  @ApiResponse({ status: 200, description: 'Class updated successfully', type: Class })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Class not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(+id, updateClassDto);
  }

  @ApiOperation({ summary: 'Delete a class by its ID' })
  @ApiParam({ name: 'id', description: 'ID of the class to be deleted' })
  @ApiResponse({ status: 200, description: 'Class deleted successfully' })
  @ApiResponse({ status: 404, description: 'Class not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(+id);
  }
}
