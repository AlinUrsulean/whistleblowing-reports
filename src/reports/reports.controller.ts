import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Auth } from '../common/decorators/auth.decorator';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @Auth('USER', 'ADMIN', 'INVESTIGATOR')
  @ApiOperation({ summary: 'Create a new report' })
  @ApiResponse({ status: 201, description: 'Report successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createReportDto: CreateReportDto, @Request() req) {
    // If not anonymous, set the reporter ID from the authenticated user
    if (!createReportDto.isAnonymous) {
      createReportDto.reporterId = req.user.id;
    }
    return this.reportsService.create(createReportDto);
  }

  @Get()
  @Auth('ADMIN', 'INVESTIGATOR')
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Investigator role required' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  findAll(@Query('status') status?: string, @Query('category') category?: string) {
    return this.reportsService.findAll(status, category);
  }

  @Get('my-reports')
  @Auth('USER', 'ADMIN', 'INVESTIGATOR')
  @ApiOperation({ summary: 'Get current user reports' })
  @ApiResponse({ status: 200, description: 'User reports retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findMyReports(@Request() req) {
    return this.reportsService.findByReporter(req.user.id);
  }

  @Get(':id')
  @Auth('ADMIN', 'INVESTIGATOR')
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiResponse({ status: 200, description: 'Report retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Investigator role required' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  @Auth('ADMIN', 'INVESTIGATOR')
  @ApiOperation({ summary: 'Update report by ID' })
  @ApiResponse({ status: 200, description: 'Report updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Investigator role required' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(':id')
  @Auth('ADMIN')
  @ApiOperation({ summary: 'Delete report by ID' })
  @ApiResponse({ status: 200, description: 'Report deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
