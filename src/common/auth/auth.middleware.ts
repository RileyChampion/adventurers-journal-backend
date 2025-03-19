import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Request, Response, NextFunction } from 'express';
  import { AuthService } from './auth.service';
  
  @Injectable()
  export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}
  
    async use(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
  
      try {
        const user = await this.authService.validateUser(token);
        req['user'] = user;
        next();
      } catch {
        throw new UnauthorizedException('Invalid Token');
      }
    }
  }
  