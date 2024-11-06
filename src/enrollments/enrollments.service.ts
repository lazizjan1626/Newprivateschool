import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './models/enrollment.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EnrollmentsService {
  constructor(@InjectModel(Enrollment) private readonly enrollmentModel: typeof Enrollment){}

  
  create(createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentModel.create(createEnrollmentDto);
  }

  findAll() {
    return this.enrollmentModel.findAll();
  }

  findOne(id: number) {
    return this.enrollmentModel.findByPk(id);
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentModel.update(updateEnrollmentDto, { where: { id } });
  }

  remove(id: number) {
    return this.enrollmentModel.destroy({ where: { id } });
  }
}
