import { Injectable } from '@nestjs/common';
import { IPasswordService } from '../IPasswordService';

@Injectable()
export class NaivePasswordService implements IPasswordService {
  hash(password: string): string {
    return password;
  }
}
