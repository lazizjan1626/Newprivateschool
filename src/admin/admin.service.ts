import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Admin Service')
@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin)private readonly studentModel: typeof Admin,
  private readonly jwtService: JwtService){}



  @ApiOperation({
    summary: 'Generate JWT Tokens for admin', 
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully generated JWT tokens',
    schema: {
      example: {
        accessToken: 'your-access-token',
        refreshToken: 'your-refresh-token',
      },
    },
  })
  async generateToken(admin: Admin) {
    try {
      const payload = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
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




  async signup(CreateAdminDto:CreateAdminDto,res:Response){ 
    try {

    const {
      name,
      email,
      password,
      is_active,
      is_creator,
    } = CreateAdminDto

    const existingEmail = await Admin.findOne({ where: { email } })

    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashed_password = await bcrypt.hash(password,7)

    const admin = await Admin.create({
      name,
      email,
      hashed_password: hashed_password,
      is_active,
      is_creator,
    });
    const { accessToken, refreshToken } = await this.generateToken(admin);

    res.cookie('access-token', accessToken, { httpOnly: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

    return res.json({ message: 'admin created successfully', admin,
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

      const user = await Admin.findByPk(payload.id);

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
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!admin.hashed_password || typeof admin.hashed_password !== 'string') {
            console.error("Hashed password is not valid:", admin.hashed_password);
            return res.status(500).json({ message: 'Server error: invalid hashed password format.' });
        }

        const isMatch = await bcrypt.compare(password, admin.hashed_password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = await this.generateToken(admin);

        res.cookie('access-token', accessToken, { httpOnly: true });
        res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

        return res.json({
            message: 'Logged in successfully',
            accessToken: accessToken,
            email: admin.email,
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


  async findOne(id: number): Promise<Admin> {
    try {
      const student = await this.studentModel.findByPk(id);

      if (!student) {
        throw new NotFoundException(`admin with ID ${id} not found`);
      }

      return student;
      
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to retrieve admin');
      
    }
  
  }

  async findAll(res: Response): Promise<Response> {
    try {
        const admins = await this.studentModel.findAll();
      
        if (admins.length === 0) {
            return res.status(404).json({ message: 'No admin found' });
        }
        
        return res.json(admins); 
    } catch (error) {
        console.error('Error fetching admin:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }


  async update(id: number, UpdateAdminDto: UpdateAdminDto): Promise<Admin> {
    try {
      const student = await this.studentModel.findByPk(id);

      if (!student) {
        throw new NotFoundException(`admin with ID ${id} not found`);
      }

      return await student.update(UpdateAdminDto);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to update admin');
      
    }
  }


  async remove(id: number): Promise<string> {
    try {
      const student = await this.studentModel.findByPk(id);

      if (!student) {
        throw new NotFoundException(`admin with ID ${id} alredy remuved`);

      }

      await student.destroy();

      return (`Admin with ID ${id} deleted successfully`);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to delete admin');
      
    }
  }



}
