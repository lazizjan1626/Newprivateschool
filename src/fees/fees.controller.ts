import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeesService } from './fees.service';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('fees')
@Controller('fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new fee entry' })
  @ApiResponse({
    status: 201,
    description: 'Fee successfully created',
    type: CreateFeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data',
  })
  create(@Body() createFeeDto: CreateFeeDto) {
    return this.feesService.create(createFeeDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all fee entries' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all fees',
    type: [CreateFeeDto],
  })
  findAll() {
    return this.feesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get fee entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved fee',
    type: CreateFeeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Fee not found',
  })
  findOne(@Param('id') id: string) {
    return this.feesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update fee entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated fee',
    type: UpdateFeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  @ApiResponse({
    status: 404,
    description: 'Fee not found',
  })
  update(@Param('id') id: string, @Body() updateFeeDto: UpdateFeeDto) {
    return this.feesService.update(+id, updateFeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete fee entry by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted fee',
  })
  @ApiResponse({
    status: 404,
    description: 'Fee not found',
  })
  remove(@Param('id') id: string) {
    return this.feesService.remove(+id);
  }
}
