import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        title: createReportDto.title,
        description: createReportDto.description,
        category: createReportDto.category,
        isAnonymous: createReportDto.isAnonymous || false,
        reporterId: createReportDto.reporterId,
      },
      include: {
        reporter: true,
      },
    });
  }

  async findAll() {
    return this.prisma.report.findMany({
      include: {
        reporter: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.report.findUnique({
      where: { id },
      include: {
        reporter: true,
      },
    });
  }

  async findByReporter(reporterId: number) {
    return this.prisma.report.findMany({
      where: { reporterId },
      include: {
        reporter: true,
      },
    });
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    return this.prisma.report.update({
      where: { id },
      data: updateReportDto,
      include: {
        reporter: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.report.delete({
      where: { id },
    });
  }
}
