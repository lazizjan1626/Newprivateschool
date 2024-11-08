import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Parent } from './models/parent.model';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class ParentService {
  constructor(@InjectModel(Parent) private readonly parentModel: typeof Parent,
  private readonly jwtService: JwtService){}


  

  
  async generateToken(parent: Parent) {
    try {
      const payload = {
        id: parent.id,
        email: parent.email,
        first_name: parent.first_name,
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
  async signup(createParentDto:CreateParentDto,res:Response){ 
    try {

    const {
      email,
      password,
      first_name,
      last_name,
      age,
      gender,
      address,
      relationship,

    } = createParentDto

    const existingEmail = await Parent.findOne({ where: { email } })

    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashed_password = await bcrypt.hash(password,7)

    const parent = await Parent.create({
      first_name,
      last_name,
      email,
      hashed_password: hashed_password,
      age,
      gender,
      address,
      relationship,
      is_active:true
    });
    const { accessToken, refreshToken } = await this.generateToken(parent);

    res.cookie('access-token', accessToken, { httpOnly: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

    return res.json({ message: 'User created successfully', parent,
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

      const user = await Parent.findByPk(payload.id);

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
      const parent = await Parent.findOne({ where: { email } });

      if (!parent) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, parent.hashed_password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const { accessToken, refreshToken } = await this.generateToken(parent);

      res.cookie('access-token', accessToken, { httpOnly: true });
      res.cookie('refresh-token', refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });

      return res.json({ message: 'Logged in successfully',
        accestoken: accessToken,
        email: parent.email,
      });
    }catch (err) {
      console.log(err);
      throw err;
    }
  }

  async logout(authHeader: string, res: Response) {
    try {
        const token = authHeader?.split(' ')[1];
        console.log(token);

        if (!token) {
            return res.status(400).json({ message: 'Token not provided' });
        }

        const decodedToken = this.jwtService.verify(token);
        const id = decodedToken.id;

        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const parent = await this.parentModel.findByPk(id);
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

  async findOne(id: number): Promise<Parent> {
    try {
      const parent = await this.parentModel.findByPk(id);

      if (!parent) {
        throw new NotFoundException(`Parent with ID ${id} not found`);
      }

      return parent;
      
    } catch (error) {
      console.log(error);
      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to retrieve parent');
      
    }
  
  }

  async findAll(res: Response): Promise<Response> {
    try {
        const parents = await this.parentModel.findAll(
          {
            attributes: [
              'id',
               'first_name',
                'last_name',
                  'age',
                    'address',
                    'relationship',
                    ],
          }
        );
      
        if (parents.length === 0) {
            return res.status(404).json({ message: 'No parents found' });
        }
        
        return res.json(parents); 
    } catch (error) {
        console.error('Error fetching parents:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  }
  async update(id: number, updateParentDto: UpdateParentDto): Promise<Parent> {
    try {
      const parent = await this.parentModel.findByPk(id);

      if (!parent) {
        throw new NotFoundException(`Parent with ID ${id} not found`);
      }

      return await parent.update(updateParentDto);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to update parent');
      
    }
  }
  async remove(id: number): Promise<string> {
    try {
      const parent = await this.parentModel.findByPk(id);

      if (!parent) {
        throw new NotFoundException(`Parent with ID ${id} not found`);

      }

      await parent.destroy();

      return (`Parent with ID ${id} deleted successfully`);
      
    } catch (error) {
      console.log(error);

      throw error instanceof NotFoundException? error : new InternalServerErrorException('Failed to delete parent');
      
    }
  }
  }
