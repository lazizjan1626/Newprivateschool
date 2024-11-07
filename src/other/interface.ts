// src/types/express-request.interface.ts
import { Request } from 'express';

export interface ExpressRequest extends Request {
  admin?: { is_creator: boolean }; 
}
