import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Fee } from './models/fee.model';

@Injectable()
export class FeesService {
  constructor(
    @InjectModel(Fee) private readonly feeModel: typeof Fee
  ) {}
  create(createFeeDto: CreateFeeDto) {
    try {
      const fee = this.feeModel.create(createFeeDto);

      return fee

    } catch (error) {
      throw new InternalServerErrorException('Failed to create fee');
      
    }
  }

  async findAll() {
    try {
      const feeAll = this.feeModel.findAll();

      return feeAll
      
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve fees');
      
    }
  }

  async findOne(id: number) {
    try {
      const fee = await this.feeModel.findByPk(id);

      if (!fee) {
        throw new InternalServerErrorException('Fee not found');
      }

      return fee
      
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve fee with ID'+ id)
    }
  }

  async update(id: number, updateFeeDto: UpdateFeeDto) {
    try {
      const fee = await this.findOne(id);

      if (!fee) {
        throw new InternalServerErrorException('Fee not found');
      }

      return fee.update(updateFeeDto)
      
    } catch (error) {
      throw new InternalServerErrorException('Failed to update fee with ID'+ id)
    }
  }

  async remove(id: number) {
    try {
      const fee = await this.findOne(id);

      if (!fee) {
        throw new InternalServerErrorException('Fee not found');
      }
      fee.destroy()

      return [{message: `Fee with ID ${id} has been deleted successfully`}]
      
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete fee with ID'+ id)
    }
  }
}
