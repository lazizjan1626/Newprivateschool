import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Fee } from './models/fee.model';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('fees')  
@Injectable()
export class FeesService {
  constructor(
    @InjectModel(Fee) private readonly feeModel: typeof Fee
  ) {}

  @ApiOperation({ summary: 'Create a new fee' })
  @ApiResponse({ status: 201, description: 'Fee created successfully' })
  @ApiResponse({ status: 500, description: 'Failed to create fee' })
  @ApiBody({ type: CreateFeeDto })
  create(createFeeDto: CreateFeeDto) {
    try {
      const fee = this.feeModel.create(createFeeDto);
      return fee;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create fee');
    }
  }

  @ApiOperation({ summary: 'Get all fees' })
  @ApiResponse({ status: 200, description: 'List of all fees', type: [Fee] })
  @ApiResponse({ status: 500, description: 'Failed to retrieve fees' })
  async findAll() {
    try {
      const feeAll = this.feeModel.findAll();
      return feeAll;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve fees');
    }
  }

  @ApiOperation({ summary: 'Get a single fee by ID' })
  @ApiResponse({ status: 200, description: 'Fee found', type: Fee })
  @ApiResponse({ status: 404, description: 'Fee not found' })
  @ApiResponse({ status: 500, description: 'Failed to retrieve fee' })
  async findOne(id: number) {
    try {
      const fee = await this.feeModel.findByPk(id);

      if (!fee) {
        throw new InternalServerErrorException('Fee not found');
      }

      return fee;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve fee with ID ' + id);
    }
  }

  @ApiOperation({ summary: 'Update a fee by ID' })
  @ApiResponse({ status: 200, description: 'Fee updated successfully', type: Fee })
  @ApiResponse({ status: 404, description: 'Fee not found' })
  @ApiResponse({ status: 500, description: 'Failed to update fee' })
  async update(id: number, updateFeeDto: UpdateFeeDto) {
    try {
      const fee = await this.findOne(id);

      if (!fee) {
        throw new InternalServerErrorException('Fee not found');
      }

      return fee.update(updateFeeDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update fee with ID ' + id);
    }
  }

  @ApiOperation({ summary: 'Delete a fee by ID' })
  @ApiResponse({ status: 200, description: 'Fee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Fee not found' })
  @ApiResponse({ status: 500, description: 'Failed to delete fee' })
  async remove(id: number) {
    try {
      const fee = await this.findOne(id);

      if (!fee) {
        throw new InternalServerErrorException('Fee not found');
      }
      fee.destroy();

      return [{ message: `Fee with ID ${id} has been deleted successfully` }];
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete fee with ID ' + id);
    }
  }
}
