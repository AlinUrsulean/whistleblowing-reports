import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const report = await this.prisma.report.create({
      data: {
        title: createReportDto.title,
        description: createReportDto.description,
        category: createReportDto.category,
        isAnonymous: createReportDto.isAnonymous || false,
        reporterId: createReportDto.reporterId,
      },
      include: {
        reporter: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });

    // Send notification to admins and investigators
    this.notificationsGateway.sendNotificationToRoles(['ADMIN', 'INVESTIGATOR'], {
      type: 'NEW_REPORT',
      message: `New report created: ${report.title}`,
      reportId: report.id,
      timestamp: new Date(),
    });

    return report;
  }

  async findAll(status?: string, category?: string) {
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (category) {
      where.category = category;
    }

    return this.prisma.report.findMany({
      where,
      include: {
        reporter: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
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
