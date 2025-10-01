import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;

  @IsOptional()
  @IsNumber()
  reporterId?: number;
}
