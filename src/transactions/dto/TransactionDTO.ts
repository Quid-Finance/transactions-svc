import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class TransactionDTO {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsNumberString({}, { message: 'amount must be a numeric string' })
  amount: string;
}
