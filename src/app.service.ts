import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLivecheck(): string {
    return 'App is living...';
  }
}
