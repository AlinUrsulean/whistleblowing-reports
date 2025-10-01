import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Module({
  providers: [ReportsService,NotificationsGateway],
  controllers: [ReportsController]
})
export class ReportsModule {}
