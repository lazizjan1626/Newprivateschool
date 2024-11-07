import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassScheduleService } from './class-schedule.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Class Schedule') 
@Controller('class-schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}

  @ApiOperation({ summary: 'Create a new class schedule' })
  @ApiBody({ type: CreateClassScheduleDto })
  @ApiResponse({ status: 201, description: 'The class schedule has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('create')
  create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
    return this.classScheduleService.create(createClassScheduleDto);
  }

  @ApiOperation({ summary: 'Get all class schedules' })
  @ApiResponse({ status: 200, description: 'Return all class schedules.' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Get('all')
  findAll() {
    return this.classScheduleService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific class schedule by ID' })
  @ApiParam({ name: 'id', description: 'ID of the class schedule', type: Number })
  @ApiResponse({ status: 200, description: 'The class schedule has been found.' })
  @ApiResponse({ status: 404, description: 'Class schedule not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classScheduleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a class schedule by ID' })
  @ApiParam({ name: 'id', description: 'ID of the class schedule', type: Number })
  @ApiBody({ type: UpdateClassScheduleDto })
  @ApiResponse({ status: 200, description: 'The class schedule has been updated.' })
  @ApiResponse({ status: 404, description: 'Class schedule not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassScheduleDto: UpdateClassScheduleDto) {
    return this.classScheduleService.update(+id, updateClassScheduleDto);
  }

  @ApiOperation({ summary: 'Delete a class schedule by ID' })
  @ApiParam({ name: 'id', description: 'ID of the class schedule', type: Number })
  @ApiResponse({ status: 200, description: 'The class schedule has been deleted.' })
  @ApiResponse({ status: 404, description: 'Class schedule not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classScheduleService.remove(+id);
  }
}
