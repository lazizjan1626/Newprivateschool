import { Module } from '@nestjs/common';
import { FeesService } from './fees.service';
import { FeesController } from './fees.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Fee } from './models/fee.model';
import { ApiTags } from '@nestjs/swagger';



@ApiTags('Fees Module')
@Module({
  imports:[SequelizeModule.forFeature([Fee])],
  exports: [FeesService],
  controllers: [FeesController],
  providers: [FeesService],
})
export class FeesModule {}
