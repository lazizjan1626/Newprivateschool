import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSudentDto } from './dto/create-sudent.dto';
import { UpdateSudentDto } from './dto/update-sudent.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './models/sudent.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { Parent } from '../parent/models/parent.model';
import { Gender } from '../other/types';
import { StudentParents } from '../parent/models/studentparents.model';
import { Fee } from '../fees/models/fee.model';
import { Grade } from '../grades/models/grade.model';
import { Enrollment } from '../enrollments/models/enrollment.model';
import { Attendance } from '../attendance/entities/attendance.model';

@Injectable()
export class SudentService {
  constructor(@InjectModel(Student)private readonly studentModel: typeof Student,
  @InjectModel(Parent) private parentModel: typeof Parent,
  private readonly jwtService: JwtService){}

  async createStudentWithParents(studentData: any, parentIds: number[]) {
    const student = await this.studentModel.create({
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      birthDate: studentData.birthDate,
      gender: studentData.gender,
      adress: studentData.adress,
      phone_number: studentData.phone_number,
      email: studentData.email,
      hashed_password: studentData.password,
      enrollmentDete: studentData.enrollmentDate,
      is_active: studentData.is_active,
      classID: studentData.classID,
    });

    const parents = await this.parentModel.findAll({
      where: { id: parentIds },
    });

    if (!parents || parents.length === 0) {
      throw new Error('No parents found for the given IDs');
    }

    await student.$set('parents', parents); 
    return student;
  }

  async generateToken(student: Student) {
    try {
      const payload = {
        id: student.id,
        email: student.email,
        firstName: student.firstName,
      };
  
      const accessToken = await this.jwtService.sign(payload);
  
      const refreshToken = await this.jwtService.sign(payload, {
        expiresIn: process.env.REFRESH_TOKEN_TIME || '30d',
      });
  
    return { accessToken, refreshToken };
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }





  async signup(createSudentDto:CreateSudentDto,res:Response){ 
    try {

    const {

      firstName,
      lastName,
      birthDate,
      gender,
      adress,
      phone_number,
      email,
      password,
      enrollmentDete,
      classID,
    } = createSudentDto

    const existingEmail = await Student.findOne({ where: { email } })

    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashed_password = await bcrypt.hash(password,7)

    const student = await Student.create({
      firstName,
      lastName,
      birthDate,
      gender,
      adress,
      phone_number,
      email,
      hashed_password: hashed_password,
      enrollmentDete,
      is_active:true,
      classID,
    });
    const { accessToken, refreshToken } = await this.generateToken(student);

    res.cookie('access-token', accessToken, { httpOnly: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

    return res.json({ message: 'Student created successfully', student,
      accestoken: accessToken,
      refreshToken:refreshToken,
     })

      
    } catch (error) {
      console.log(error);
      throw error;
    }

  }
  async refreshToken(token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await Student.findByPk(payload.id);

      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const { accessToken, refreshToken } = await this.generateToken(user);

      res.cookie('access-token', accessToken, { httpOnly: true });
      res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

      return res.json({ message: 'Token refreshed successfully', 
        accestoken: accessToken
      });
    } catch (error) {
      console.log(error)
    }
  }



  async login(email: string, password: string, res: Response) {
    try {
        const student = await Student.findOne({ where: { email } });

        if (!student) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!student.hashed_password || typeof student.hashed_password !== 'string') {
            console.error("Hashed password is not valid:", student.hashed_password);
            return res.status(500).json({ message: 'Server error: invalid hashed password format.' });
        }

        const isMatch = await bcrypt.compare(password, student.hashed_password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = await this.generateToken(student);

        res.cookie('access-token', accessToken, { httpOnly: true });
        res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

        return res.json({
            message: 'Logged in successfully',
            accessToken: accessToken,
            email: student.email,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error', error: err });
    }
}


  async logout(authHeader: string, res: Response) {
    try {
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'Token not provided' });
        }

        const decodedToken = this.jwtService.verify(token);
        const id = decodedToken.id;

        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const student = await this.studentModel.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.clearCookie('access-token');
        res.clearCookie('refresh-token');

        return res.json({ message: 'Logged out successfully',
          id: id,
         });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  async findOne(id: number): Promise<Student> {
    try {
      const student = await this.studentModel.findOne({
        where: { id },
        include: [
        {
          model: Fee,
          as: 'Fee',
          attributes: [
            'id',
            'ammountDue',
            'amountPaid',
            'paymentDate',
          ],
        },
        {
          model: Grade,
          as: 'Grade',
          attributes: [
            'id',
            'grade',
            'deteRecorded',
          ],
        },
        {
          model: Enrollment,
          as: 'Enrollment',
          attributes: [
            'id',
            'enrollmentDate',
          ],
        },
        {
          model:Attendance,
          as: 'Attendance',
          attributes: [
            'id',
            'status',
            'attendanceDate',
          ]
        }
      ],
      });

      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }

      return student;
      
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to retrieve student');
      
    }
  
  }



  async findAll(res: Response): Promise<Response> {
    try {
        const student = await this.studentModel.findAll();
      
        if (student.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        
        return res.json(student); 
    } catch (error) {
        console.error('Error fetching Students:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }



  async update(id: number, updateSudentDto: UpdateSudentDto): Promise<Student> {
    try {
      const student = await this.studentModel.findByPk(id);

      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }

      return await student.update(updateSudentDto);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to update student');
      
    }
  }


    async remove(id: number): Promise<string> {
    try {
      const student = await this.studentModel.findByPk(id);

      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);

      }

      await student.destroy();

      return (`Student with ID ${id} deleted successfully`);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to delete student');
      
    }
  }





  





}
