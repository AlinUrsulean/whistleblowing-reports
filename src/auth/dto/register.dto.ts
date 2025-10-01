import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'USER', enum: ['USER', 'ADMIN', 'INVESTIGATOR'], required: false })
  @IsOptional()
  @IsEnum(['USER', 'ADMIN', 'INVESTIGATOR'])
  role?: 'USER' | 'ADMIN' | 'INVESTIGATOR';
}
