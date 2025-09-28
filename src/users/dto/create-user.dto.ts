import { IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(['USER', 'ADMIN', 'INVESTIGATOR'])
  role?: 'USER' | 'ADMIN' | 'INVESTIGATOR';
}
