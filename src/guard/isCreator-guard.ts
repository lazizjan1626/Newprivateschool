import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ExpressRequest } from '../other/interface';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const admin = request.admin; 

    if (admin && admin.is_creator) {
      return true;
    }

    throw new ForbiddenException('Siz bu amalni bajarish huquqiga ega emassiz');
  }
}
