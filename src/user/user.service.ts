import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcryptjs';
import { Role } from '../role/models/role.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class UserService {
  constructor(@InjectModel(User)private readonly userModel: typeof User,
  private readonly jwtService: JwtService,){}

  async generateToken(user: User) {
    try {
      const payload = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
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


  async signup(createUserDto:CreateUserDto,res:Response){ 
    try {

    const {
      full_name,
      email,
      password,
      phone_number,
      roleID,
      is_creator,
    } = createUserDto

    const existingEmail = await User.findOne({ where: { email } })

    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashed_password = await bcrypt.hash(password,7)

    const user = await User.create({
      full_name,
      email,
      hashed_password: hashed_password,
      phone_number,
      roleID,
      is_creator,
    });
    const { accessToken, refreshToken } = await this.generateToken(user);

    res.cookie('access-token', accessToken, { httpOnly: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

    return res.json({ message: 'Student created successfully', user,
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

      const user = await User.findByPk(payload.id);

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
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.hashed_password || typeof user.hashed_password !== 'string') {
            console.error("Hashed password is not valid:", user.hashed_password);
            return res.status(500).json({ message: 'Server error: invalid hashed password format.' });
        }

        const isMatch = await bcrypt.compare(password, user.hashed_password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = await this.generateToken(user);

        res.cookie('access-token', accessToken, { httpOnly: true });
        res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

        return res.json({
            message: 'Logged in successfully',
            accessToken: accessToken,
            email: user.email,
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

        const user = await this.userModel.findByPk(id);
        if (!user) {
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

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userModel.findByPk(id);

      if (!user) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }

      return user;
      
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to retrieve student');
      
    }
  }
  async findAll(res: Response): Promise<Response> {
    try {
        const user = await this.userModel.findAll();
      
        if (user.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }
        
        return res.json(user); 
    } catch (error) {
        console.error('Error fetching Students:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findByPk(id);

      if (!user) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }

      return await user.update(updateUserDto);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to update student');
      
    }
  }




  async remove(id: number): Promise<string> {
    try {
      const user = await this.userModel.findByPk(id);

      if (!user) {
        throw new NotFoundException(`Student with ID ${id} not found`);

      }

      await user .destroy();

      return (`Student with ID ${id} deleted successfully`);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to delete student');
      
    }
  }






}
