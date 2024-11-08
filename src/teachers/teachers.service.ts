import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher) private readonly teacherModel: typeof Teacher,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(teacher: Teacher) {
    try {
      const payload = {
        id: teacher.id,
        email: teacher.email,
        firstName: teacher.firstName,
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

  async signup(createTeacherDto: CreateTeacherDto, res: Response){ 
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        subjectID,
        address,
        phone,
        hireDate,
        roleID,
      } = createTeacherDto;

      const existingEmail = await this.teacherModel.findOne({ where: { email } });

      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 7);

      const teacher = await this.teacherModel.create({
        email,
        hashedpassword: hashedPassword, 
        firstName,
        lastName,
        address,
        phone,
        hireDate,
        roleID,
        subjectID,
        is_active:true
      });

      const { accessToken, refreshToken } = await this.generateToken(teacher);

      res.cookie('access-token', accessToken, { httpOnly: true });
      res.cookie('refresh-token', refreshToken, { 
        httpOnly: true, 
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
      });

      return res.json({
        message: 'Teacher created successfully', 
        teacher,
        accessToken,
        refreshToken
      });

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

        const user = await Teacher.findByPk(payload.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { accessToken, refreshToken } = await this.generateToken(user);

        res.cookie('access-token', accessToken, { httpOnly: true });
        res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

        return res.json({ message: 'Token refreshed successfully', accestoken: accessToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred while refreshing the token' });
    }
}

async login(email: string, password: string, res: Response) {
  try {
      const teacher = await Teacher.findOne({ where: { email } });

      if (!teacher) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, teacher.hashedpassword); 

      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const { accessToken, refreshToken } = await this.generateToken(teacher);

      res.cookie('access-token', accessToken, { httpOnly: true });
      res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

      return res.json({
          message: 'Logged in successfully',
          accestoken: accessToken,
          email: teacher.email,
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'An error occurred during login' });
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

        const parent = await this.teacherModel.findByPk(id);
        if (!parent) {
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

  async findAll(res: Response): Promise<Response> {
    try {
        const teacher = await this.teacherModel.findAll();
      
        if (teacher.length === 0) {
            return res.status(404).json({ message: 'No teacehr found' });
        }
        return res.json(teacher); 
    } catch (error) {
        console.error('Error fetching teacehr:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async findOne(id: number): Promise<Teacher> {
    try {
      const teacher = await this.teacherModel.findByPk(id);

      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }

      return teacher;
      
    } catch (error) {
      console.error('Error fetching teacher:', error);
      throw error;
      
    }
  }
  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    try {
      const teacehr = await this.teacherModel.findByPk(id);

      if (!teacehr) {
        throw new NotFoundException(`teacher with ID ${id} not found`);
      }

      return await teacehr.update(updateTeacherDto);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to update teacher');
      
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const teacher = await this.teacherModel.findByPk(id);

      if (!teacher) {
        throw new NotFoundException(`teacehr with ID ${id} not found`);

      }

      await teacher.destroy();

      return (`teacher with ID ${id} deleted successfully`);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to delete teacher');
      
    }

  }
}
