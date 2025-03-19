import { Injectable } from '@nestjs/common';
import { supabaseClient } from '../../config/supabase.config';

@Injectable()
export class AuthService {
  async validateUser(token: string) {
    const { data, error } = await supabaseClient.auth.getUser(token);
    if (error) throw new Error('Invalid token');
    return data.user;
  }
}
